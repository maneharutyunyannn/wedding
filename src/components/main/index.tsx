'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import WeddingEnvelope from "@/components/sections/envelope";
import { HeroSection } from "@/components/sections/hero";
import { IntroductionSection } from "@/components/sections/introduction";
import { ProgramSection } from "@/components/sections/program";
import { TimerSection } from "@/components/sections/timer";
import { PresenceSection } from "@/components/sections/presence";

export default function Main() {
    const [opened, setOpened] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const sectionsRef = useRef<HTMLDivElement[]>([]);

    const userInteracting = useRef(false);
    const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
    const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

    const handleOpen = () => {
        videoRef.current?.play();
        setOpened(true);
    };


    const goTo = (index: number) => {
        const container = containerRef.current;
        const target = sectionsRef.current[index];
        if (!container || !target) return;

        userInteracting.current = true;

        container.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
        });

        setActiveIndex(index);

        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

        resumeTimerRef.current = setTimeout(() => {
            userInteracting.current = false;
        }, 1500);
    };

    const scheduleAutoScroll = () => {
        if (autoTimerRef.current) clearTimeout(autoTimerRef.current);

        autoTimerRef.current = setTimeout(() => {
            if (userInteracting.current) {
                scheduleAutoScroll();
                return;
            }

            const next = activeIndex + 1;
            if (next < sectionsRef.current.length) {
                goTo(next);
            }
        }, 3000);
    };

    useEffect(() => {
        if (!opened) return;

        const container = containerRef.current;
        const sections = sectionsRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                let maxRatio = 0;
                let visibleIndex = 0;

                entries.forEach((entry) => {
                    const index = sections.indexOf(entry.target as HTMLDivElement);

                    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        visibleIndex = index;
                    }
                });

                setActiveIndex(visibleIndex);
            },
            {
                root: container,
                threshold: [0.3, 0.5, 0.7, 0.9],
            }
        );

        sections.forEach((sec) => sec && observer.observe(sec));

        return () => observer.disconnect();
    }, [opened]);

    useEffect(() => {
        if (!opened) return;
        scheduleAutoScroll();

        return () => {
            if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
        };
    }, [activeIndex, opened]);

    useEffect(() => {
        const onInteract = () => {
            userInteracting.current = true;

            if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

            resumeTimerRef.current = setTimeout(() => {
                userInteracting.current = false;
                scheduleAutoScroll();
            }, 2000);
        };

        window.addEventListener("wheel", onInteract, { passive: true });
        window.addEventListener("touchmove", onInteract, { passive: true });

        return () => {
            window.removeEventListener("wheel", onInteract);
            window.removeEventListener("touchmove", onInteract);
        };
    }, [opened]);

    return (
        <main className="relative max-w-sm mx-auto overflow-hidden">
            <div className="fixed inset-0 -z-10">
                {/*<video*/}
                {/*    className="hidden"*/}
                {/*    ref={videoRef}*/}
                {/*    loop*/}
                {/*    playsInline*/}
                {/*>*/}
                {/*    <source src="/lady.webm" type="video/webm"/>*/}
                {/*</video>*/}


                <Image
                    src="/main.jpg"
                    alt="background"
                    fill
                    priority
                    className="object-cover scale-105"
                />
                <div className="absolute inset-0 bg-black/40"/>
            </div>

            <AnimatePresence>
                {!opened && (
                    <motion.div
                        key="envelope"
                        className="fixed inset-0 z-50"
                        exit={{opacity: 0, scale: 1.05, filter: "blur(10px)"}}
                        transition={{ duration: 0.8 }}
                    >
                        <WeddingEnvelope onFinish={handleOpen} />
                    </motion.div>
                )}
            </AnimatePresence>

            {opened && (
                <motion.div
                    ref={containerRef}
                    className="h-dvh overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div
                        ref={el => { if (el) sectionsRef.current[0] = el; }}
                        className="h-dvh snap-start"
                    >
                        <HeroSection />
                    </div>

                    <div
                        ref={el => { if (el) sectionsRef.current[1] = el; }}
                        className="h-screen snap-start"
                    >
                        <IntroductionSection />
                    </div>

                    <div
                        ref={el => { if (el) sectionsRef.current[2] = el; }}
                        className="h-screen snap-start"
                    >
                        <ProgramSection />
                    </div>

                    <div
                        ref={el => { if (el) sectionsRef.current[3] = el; }}
                        className="h-screen snap-start"
                    >
                        <TimerSection />
                    </div>

                    <div
                        ref={el => { if (el) sectionsRef.current[4] = el; }}
                        className="min-h-dvh pb-safe snap-start"
                    >
                        <PresenceSection />
                    </div>
                </motion.div>
            )}
        </main>
    );
}
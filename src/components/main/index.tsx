'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import WeddingEnvelope from "@/components/sections/envelope";
import { HeroSection } from "@/components/sections/hero";
import { IntroductionSection } from "@/components/sections/introduction";
import { ProgramSection } from "@/components/sections/program";
import { TimerSection } from "@/components/sections/timer";
import { PresenceSection } from "@/components/sections/presence";
import  { MusicPlayerHandle } from "@/components/music-player";

export default function Main() {
    const [opened, setOpened] = useState(false);
    const musicRef = useRef<MusicPlayerHandle>(null);

    const handleOpen = () => {
        console.log("CLICK TRIGGERED");

        const res = musicRef.current?.play();
        console.log("PLAY RESULT:", res);

        setTimeout(() => setOpened(true), 900);
    };


    return (
        <main className="relative mx-auto max-w-md overflow-hidden">
            <div className="fixed inset-0 -z-10">

                <video
                    autoPlay
                    loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src="/lady.webm" type="video/webm"/>
                </video>

                <Image
                    src="/main.jpg"
                    alt="background"
                    fill
                    priority
                    className="scale-105 object-cover"
                />
                <div className="absolute inset-0 bg-black/40"/>
            </div>
            <AnimatePresence>
                {!opened && (
                    <motion.div
                        key="envelope"
                        className="fixed inset-0 z-50"
                        exit={{opacity: 0, scale: 1.05, filter: "blur(10px)"}}
                        transition={{duration: 0.8}}
                    >
                        <WeddingEnvelope onFinish={handleOpen}/>
                    </motion.div>
                )}
            </AnimatePresence>

            {opened && (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
                >
                    <HeroSection/>
                    <IntroductionSection/>
                    <ProgramSection/>
                    <TimerSection/>
                    <PresenceSection/>
                </motion.div>
            )}
        </main>
    );
}
'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { dzeragir } from "@/config /font";

const TARGET_DATE = new Date("2026-08-23T00:00:00");

function getTimeLeft() {
    const diff = TARGET_DATE.getTime() - Date.now();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

export function TimerSection() {
    const [time, setTime] = useState(getTimeLeft);

    useEffect(() => {
        const id = setInterval(() => setTime(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="py-10 relative mx-auto flex min-h-[100dvh] w-full max-w-md snap-start flex-col items-center justify-center gap-10">
            <h2 className={cn(dzeragir.className, "text-center text-3xl text-white")}>
                Մինչ հարսանիքը մնացել է
            </h2>

            <div className="flex gap-4">
                <TimeCircle label="Օր" value={time.days} />
                <TimeCircle label="Ժամ" value={time.hours} />
                <TimeCircle label="Րոպե" value={time.minutes} />
                <TimeCircle label="Վայրկյան" value={time.seconds} />
            </div>
        </section>
    );
}

function TimeCircle({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-[#FFE0B2] backdrop-blur-sm">
            <span className="text-lg font-semibold text-white">{value}</span>
            <span className="text-xs text-white/60">{label}</span>
        </div>
    );
}
'use client';

import { dzeragir } from "@/config /font";
import { cn } from "@/lib/utils";

export function HeroSection() {
    return (
        <section
            className="relative flex min-h-[100dvh] snap-start items-end justify-center pb-20 text-center text-white">
            <h2 className={cn(dzeragir.className, "text-5xl")}>
                Հովհաննես և Լիանա
            </h2>
        </section>
    );
}
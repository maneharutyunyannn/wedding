'use client';

import Image from "next/image";
import {cn} from "@/lib/utils";
import {dzeragir} from "@/config /font";

export function IntroductionSection() {
    return (
        <section
            className=" relative min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center gap-6 px-6 py-16 text-center">
            <h2 className={cn(dzeragir.className, "text-4xl text-[#FFE0B2]")}>
                Սիրելի՛ ընկերներ և հարազատներ
            </h2>

            <p className={cn(dzeragir.className, "text-xl text-white")}>
                Մոտենում է մեր կյանքի ամենակարևոր պահերից մեկը՝ մեր հարսանիքի օրը
            </p>

            <h3 className={cn(dzeragir.className, "pt-8 text-3xl text-[#FFE0B2]")}>
                Օգոստոս
            </h3>

            <div className="relative aspect-[2/1] w-full max-w-sm">
                <Image
                    src="/calendar2.png"
                    alt="calendar"
                    fill
                    className="object-contain"
                />
            </div>
        </section>
    );
}
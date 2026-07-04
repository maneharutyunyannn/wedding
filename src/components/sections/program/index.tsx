'use client';

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/shadcn-ui/button";
import { dzeragir } from "@/config /font";
import { cn } from "@/lib/utils";

interface ProgramProps {
    title: string,
    time: string,
    place: string,
    address: string,
    image: string,
    map: string
}

export function ProgramSection() {
    return (
        <section className="py-10 relative mx-auto min-h-[100dvh] w-full max-w-md snap-start overflow-hidden">
            <div className="relative z-10 flex min-h-[100dvh] flex-col items-center px-6 py-16 text-center">
                <h2 className={cn(dzeragir.className, "text-4xl text-[#FFE0B2]")}>
                    Օրվա ծրագիրը
                </h2>

                <div className="mt-10 flex w-full flex-col gap-14">
                    {program.map((item) => (
                        <article key={item.title} className="flex flex-col items-center">
                            <h3 className={cn(dzeragir.className, "pt-3 text-xl text-white")}>
                                {item.title}
                            </h3>

                            <p className={cn(dzeragir.className, "text-2xl text-[#FFE0B2]")}>
                                {item.time}
                            </p>

                            <div className="relative h-56 w-56">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                className="mt-4 rounded-xl border-[#FFE0B2] bg-transparent px-6 text-white hover:text-white hover:bg-transparent"
                            >
                                <Link
                                    href={item.map}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.place}
                                </Link>
                            </Button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

const program: ProgramProps[] = [
    {
        title: "Պսակադրություն",
        time: "13:00",
        place: "Հաղարծնի վանք",
        address: "Դիլիջան, Տավուշի մարզ, Հայաստան",
        image: "/church.png",
        map: "https://maps.app.goo.gl/UozKjg6CGh6gjdiK8",
    },
    {
        title: "Հարսանեկան խնջույք",
        time: "16:00",
        place: "«Dream Park» ռեստորան",
        address: "Լոռու մարզ, Գյուլագարակ գյուղ",
        image: "/logo33.png",
        map: "https://maps.app.goo.gl/RQz5fM9NJbCqLSsr5",
    },
];
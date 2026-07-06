'use client';

import { useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { vrdznagir } from "@/config /font";

type Props = {
    onFinish?: () => void;
};

type Phase = 'closed' | 'opening' | 'opened' | 'done';

export default function WeddingEnvelope({ onFinish }: Props) {
    const [phase, setPhase] = useState<Phase>('closed');
    const flapRef = useRef<HTMLDivElement | null>(null);

    const handleOpen = () => {
        if (phase !== 'closed') return;
        setPhase('opening');
    };

    const handleFlapTransitionEnd = (e: React.TransitionEvent) => {
        if (e.propertyName !== 'transform') return;

        if (phase === 'opening') {
            setPhase('opened');
            onFinish?.();

            requestAnimationFrame(() => {
                setPhase('done');
            });
        }
    };

    const isOpened = phase === 'opening' || phase === 'opened' || phase === 'done';
    const hideEnvelope = phase === 'done';

    return (
        <div
            className={cn(
                "stage",
                {
                    "is-opened": isOpened,
                    "is-letter": hideEnvelope,
                },
                "flex flex-col gap-10"
            )}
        >
            <div className="envelope-wrap">
                <div className="envelope">

                    <div className="pocket" />

                    <div
                        ref={flapRef}
                        className="flap"
                        onTransitionEnd={handleFlapTransitionEnd}
                    />

                    <button
                        className="seal"
                        onClick={handleOpen}
                        disabled={isOpened}
                        aria-label="open"
                    >
                        <img
                            src="/seal.png"
                            alt="seal"
                            className="seal-image"
                            draggable={false}
                        />
                    </button>

                    <h2 className={cn(vrdznagir.className, "invite-text")}>
                        Դուք հրավիրված եք մեր հարսանիքին
                    </h2>

                </div>
            </div>

            <div className="hint md:pl-[400px] pb-22">
                <p className={cn(vrdznagir.className, "text-white text-lg leading-[16px] pr-14 font-semibold")}>
                    <span className="block">Սեղմիր</span>
                    <span className="block">այստեղ</span>
                </p>

                <svg className="hint-arrow" viewBox="0 0 200 200">
                    <path
                        d="M20,40 C80,10 120,140 170,120"
                        fill="none"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <path
                        d="M165,115 L175,120 L165,125"
                        fill="none"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <style jsx>{`
                .stage {
                    --paper: #faf3e8;
                    --envelope: #e7d6b8;
                    --envelope-shadow: #cbb388;
                    --envelope-dark: #b99e6f;

                    position: fixed;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--paper);
                    overflow: hidden;
                }

                .dark .stage {
                    --paper: #0f0f0f;
                    --envelope: #1f1f1f;
                    --envelope-shadow: #2a2a2a;
                }

                .envelope-wrap {
                    perspective: 1400px;
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }

                .is-letter .envelope-wrap {
                    opacity: 0;
                    transform: scale(0.9) translateY(10px);
                    pointer-events: none;
                }

                .envelope {
                    position: relative;
                    width: min(88vw, 360px);
                    aspect-ratio: 3 / 2;
                }

                .pocket {
                    position: absolute;
                    inset: 0;
                    background: var(--envelope);
                    border-radius: 8px;
                    box-shadow: 0 18px 40px -18px rgba(58, 46, 40, 0.45);
                }

                .flap {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 58%;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    clip-path: polygon(0 0, 100% 0, 50% 100%);
                    background: linear-gradient(160deg, var(--envelope), var(--envelope-shadow));
                    transform-origin: top center;
                    transition: transform 0.95s cubic-bezier(0.6, 0.05, 0.25, 1);
                    z-index: 2;
                }

                .is-opened .flap {
                    transform: rotateX(-178deg);
                }

                .seal {
                    position: absolute;
                    bottom: 60px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: none;
                    cursor: pointer;
                    z-index: 5;
                    transition: transform 0.25s ease, opacity 0.4s ease;
                }

                .is-opened .seal {
                    opacity: 0;
                    pointer-events: none;
                    transform: translateX(-50%) scale(0.7);
                }

                .invite-text {
                    position: absolute;
                    bottom: 18px;
                    left: 55%;
                    transform: translateX(-50%);
                    width: 90%;
                    text-align: center;
                    font-size: 20px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.95);
                    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
                    z-index: 10000;
                }

                .hint {
                    position: absolute;
                    bottom: 225px;
                    left: 30%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    pointer-events: none;
                    z-index: 10;
                }

                .hint-arrow {
                    width: 90px;
                    height: 90px;
                    opacity: 0.85;
                    filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
                    animation: arrowFloat 2.2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
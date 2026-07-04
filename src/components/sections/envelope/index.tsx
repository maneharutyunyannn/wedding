'use client';

import { useRef, useState } from 'react';

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
        <div className={`stage ${isOpened ? 'is-opened' : ''} ${hideEnvelope ? 'is-letter' : ''}`}>
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
                        <img src="/seal.png" alt="seal" className="seal-image" draggable={false} />
                    </button>
                </div>
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
            `}</style>
        </div>
    );
}
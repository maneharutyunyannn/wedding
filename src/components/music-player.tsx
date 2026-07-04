'use client';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export type MusicPlayerHandle = {
    play: () => Promise<void>;
    pause: () => void;
    isPlaying: () => boolean;
};

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playingRef = useRef(false);

    useEffect(() => {
        const audio = new Audio('/music/die.mp3')

        audio.loop = true;
        audio.preload = 'auto';
        audio.volume = 0.6;

        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = '';
            audioRef.current = null;
        };
    }, []);

    const play = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            await audio.play();
            playingRef.current = true;
        } catch (err) {
            console.warn('Audio blocked by browser:', err);
        }
    };

    const pause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        playingRef.current = false;
    };

    const isPlaying = () => playingRef.current;

    useImperativeHandle(ref, () => ({
        play,
        pause,
        isPlaying,
    }));

    return null;
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;
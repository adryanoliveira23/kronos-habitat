import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const bgMusic = "/bg-music.mp3";

export default function BackgroundMusic({ volume }: { volume: number }) {
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.5;

        const attemptPlay = () => {
            if (audio.paused) {
                audio.play()
                    .then(() => {
                        setIsPlaying(true);
                        setIsMuted(false);
                    })
                    .catch(() => {
                        console.log("Play blocked by browser, waiting for interaction.");
                    });
            } else {
                setIsPlaying(true);
            }
        };

        const onInteraction = () => {
            attemptPlay();
            if (!audio.paused) {
                window.removeEventListener("click", onInteraction);
                window.removeEventListener("scroll", onInteraction);
                window.removeEventListener("touchstart", onInteraction);
            }
        };

        window.addEventListener("click", onInteraction);
        window.addEventListener("scroll", onInteraction, { passive: true });
        window.addEventListener("touchstart", onInteraction, { passive: true });

        // Initial attempt
        attemptPlay();

        return () => {
            window.removeEventListener("click", onInteraction);
            window.removeEventListener("scroll", onInteraction);
            window.removeEventListener("touchstart", onInteraction);
            audio.pause();
        };
    }, []);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (audioRef.current) {
            const newMutedState = !isMuted;
            setIsMuted(newMutedState);
            audioRef.current.muted = newMutedState;

            // If we were paused (blocked), try to play now
            if (!newMutedState && audioRef.current.paused) {
                audioRef.current.play().then(() => setIsPlaying(true));
            }
        }
    };

    return (
        <audio
            ref={audioRef}
            src={bgMusic}
            loop
            playsInline
        />
    );
}

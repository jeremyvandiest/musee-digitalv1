"use client";

import React from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

type VideoControlsProps = {
    isPlaying: boolean;
    isMuted: boolean;
    onTogglePlay: () => void;
    onToggleMute: () => void;
};

export default function VideoControls({
    isPlaying,
    isMuted,
    onTogglePlay,
    onToggleMute,
}: VideoControlsProps) {
    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            {/* Container discret */}
            <div className="flex items-center gap-2 px-3 py-2 bg-beige/80 backdrop-blur-sm border border-line-soft rounded-full shadow-sm">
                {/* PLAY/PAUSE */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onTogglePlay();
                    }}
                    className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-anthracite hover:text-white transition-colors focus:outline-none"
                    aria-label={isPlaying ? "Pause" : "Lecture"}
                >
                    {isPlaying ? (
                        <Pause className="w-4 h-4 text-anthracite group-hover:text-white" />
                    ) : (
                        <Play className="w-4 h-4 text-anthracite group-hover:text-white ml-0.5" />
                    )}
                </button>

                <div className="w-px h-4 bg-anthracite/20"></div>

                {/* MUTE/UNMUTE */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleMute();
                    }}
                    className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-anthracite hover:text-white transition-colors focus:outline-none"
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                >
                    {isMuted ? (
                        <VolumeX className="w-4 h-4 text-anthracite group-hover:text-white" />
                    ) : (
                        <Volume2 className="w-4 h-4 text-anthracite group-hover:text-white" />
                    )}
                </button>
            </div>
        </div>
    );
}

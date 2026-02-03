"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type NavigationBarProps = {
    currentIndex: number;
    totalSlides: number;
    onPrev: () => void;
    onNext: () => void;
};

export default function NavigationBar({
    currentIndex,
    totalSlides,
    onPrev,
    onNext,
}: NavigationBarProps) {
    // Calcul pourcentage : (currentIndex + 1) / totalSlides * 100
    const progressPercent = ((currentIndex + 1) / totalSlides) * 100;
    const isLastSlide = currentIndex === totalSlides - 1;

    // Salles 01 à 06
    const roomNumber = (currentIndex + 1).toString().padStart(2, "0");

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between px-6 bg-blanc-casse border-t border-line h-[var(--bottombar-height)] box-border pb-[env(safe-area-inset-bottom)]">
            {/* GAUCHE - Label Salle */}
            <div className="w-[140px] md:w-auto">
                <span className="hidden md:inline font-sans text-[12px] uppercase tracking-wide text-anthracite">
                    Salle {roomNumber} — {roomNumber}/06
                </span>
                <span className="md:hidden font-sans text-[12px] uppercase tracking-wide text-anthracite">
                    {roomNumber}/06
                </span>
            </div>

            {/* CENTRE - Progression */}
            <div className="relative w-[160px] md:w-[240px] h-[2px] bg-line rounded-full">
                <div
                    className="absolute left-0 top-0 h-full bg-cuivre rounded-full transition-all duration-600 ease-out"
                    style={{ width: `${progressPercent}%` }}
                />
                {/* Tick final */}
                <div
                    className={`absolute -right-1 -top-1 w-1 h-1 md:w-[4px] md:h-[4px] rounded-full transition-colors duration-300 ${isLastSlide ? "bg-cuivre" : "bg-line"}`}
                    style={{ right: 0, top: -1 }}
                />
            </div>

            {/* DROITE - Navigation */}
            <div className="flex gap-4">
                <button
                    onClick={onPrev}
                    disabled={currentIndex === 0}
                    className="group flex items-center justify-center px-3 py-1.5 min-w-[60px] md:min-w-[120px] border border-anthracite rounded-[2px] transition-all duration-300 hover:bg-anthracite hover:text-white focus:outline-none focus:ring-2 focus:ring-cuivre focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit"
                    aria-label="Slide précédent"
                >
                    <span className="hidden md:inline mr-2">← Précédent</span>
                    <span className="md:hidden">←</span>
                </button>
                <button
                    onClick={onNext}
                    disabled={currentIndex === totalSlides - 1}
                    className="group flex items-center justify-center px-3 py-1.5 min-w-[60px] md:min-w-[120px] border border-anthracite rounded-[2px] transition-all duration-300 hover:bg-anthracite hover:text-white focus:outline-none focus:ring-2 focus:ring-cuivre focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit"
                    aria-label="Slide suivant"
                >
                    <span className="hidden md:inline ml-2">Suivant →</span>
                    <span className="md:hidden">→</span>
                </button>
            </div>
        </nav>
    );
}

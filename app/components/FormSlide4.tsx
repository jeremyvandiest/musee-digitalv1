"use client";

import React, { useState } from "react";

type FormSlide4Props = {
    className?: string;
    selectedChoices: ("A" | "B" | "C")[];
    onSelectChoice: (choice: "A" | "B" | "C") => void;
    isEmailSubmitted: boolean;
};

export default function FormSlide4({ className, selectedChoices, onSelectChoice, isEmailSubmitted }: FormSlide4Props) {

    return (
        <div className={`relative w-full h-full bg-white/5 border border-anthracite/10 flex flex-col p-4 md:p-6 overflow-hidden ${className}`}>
            {/* Scanner Line Effect */}
            <div className="absolute inset-0 pointer-events-none after:content-[''] after:absolute after:left-0 after:right-0 after:h-px after:bg-cuivre/18 after:animate-scan z-0" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col justify-between h-full pt-1 pb-4">

                {/* Header */}
                <div className="text-center">
                    <span className="font-sans text-[12px] uppercase tracking-widest text-ink-2">
                        Système en cours d'exécution
                    </span>
                </div>

                {/* --- INTERACTIVE BUTTONS --- */}
                <div className="flex flex-col gap-4 my-auto w-full h-full justify-center px-4 md:px-8">
                    {[
                        { id: "A", label: "Optimiser" },
                        { id: "B", label: "Algorithme" },
                        { id: "C", label: "Donnée vide" },
                    ].map((option) => (
                        <button
                            key={option.id}
                            disabled={!isEmailSubmitted || selectedChoices.includes(option.id as any)}
                            onClick={() => onSelectChoice(option.id as any)}
                            className={`w-full flex-1 flex items-center justify-center border rounded-[2px] font-sans text-[18px] md:text-[22px] font-serif transition-all duration-300
                ${selectedChoices.includes(option.id as any)
                                    ? "bg-anthracite/20 text-anthracite/40 border-anthracite/10 grayscale scale-[0.98]"
                                    : "bg-white/40 border-anthracite/20 hover:border-cuivre hover:bg-white text-anthracite"
                                }
                ${!isEmailSubmitted ? "opacity-30 cursor-not-allowed grayscale" : ""}
                ${selectedChoices.includes(option.id as any) ? "cursor-default grayscale opacity-50" : ""}
              `}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="flex flex-col gap-1 text-center">
                    <span className="font-sans text-[9px] text-ink-2 opacity-70">
                        Dernière activité : {new Date().toLocaleTimeString()}
                    </span>
                    <span className="font-sans text-[9px] text-cuivre">
                        Statut : {selectedChoices.length > 0 ? `${selectedChoices.length} signal(ux) acquis` : "En attente"}
                    </span>
                </div>
            </div>
        </div>
    );
}

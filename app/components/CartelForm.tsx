"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

// We need a way to share state between the Buttons (on Media side) and the Email Form (on Cartel side).
// Since they are siblings in the Slider component layout, we should lift the state up to Slider.tsx
// However, to avoid refactoring everything right now, we can use a small context or just pass props.
// BUT, since we are separating the components into two different files/places, 
// let's create a "SystemControl" context/store or just pass callbacks if they were in the same parent.
// They are in Slider.tsx. So we will lift state to Slider.tsx.

// This file will now only export the email part for the cartel.
// The buttons part is handled in FormSlide4.tsx which is used in media column.

type CartelFormProps = {
    selectedChoice: "A" | "B" | "C" | null;
    onEmailSubmit: (email: string) => Promise<void>;
    status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
};

export default function CartelForm({ selectedChoice, onEmailSubmit, status }: CartelFormProps) {
    const [email, setEmail] = useState("");

    if (status === "SUCCESS") {
        return (
            <div className="bg-beige/30 p-8 border-l-4 border-cuivre animate-fade-in mt-8">
                <h3 className="font-sans text-[16px] font-medium text-cuivre mb-3">
                    Votre signal a été archivé.
                </h3>
                <p className="font-sans text-[14px] text-ink-2">
                    Le système a enregistré votre participation. Elle demeure irréversible.
                </p>
            </div>
        );
    }

    return (
        <div className={`mt-10 transition-opacity duration-300 ${status === "LOADING" ? "opacity-50 pointer-events-none" : ""}`}>
            {status === "ERROR" && (
                <div className="mb-4 bg-beige p-3 border-l-2 border-cuivre font-sans text-[14px] text-anthracite">
                    Le système n'a pas répondu. Réessayez.
                </div>
            )}

            {/* SECTION TRANSMISSION */}
            <div className="mb-6">
                <label className="block font-sans text-[10px] uppercase tracking-widest text-ink-2 mb-3">
                    TRANSMISSION
                </label>
                <input
                    type="email"
                    required
                    placeholder="adresse@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-line rounded-[2px] py-3 px-4 font-sans text-[15px] focus:outline-none focus:border-cuivre focus:ring-2 focus:ring-cuivre focus:ring-offset-1 transition duration-300"
                    disabled={!selectedChoice} // Disable if no choice selected
                />
                {!selectedChoice && (
                    <p className="text-[10px] text-cuivre mt-2 italic">
                        * Veuillez d'abord sélectionner un protocole sur l'écran de gauche.
                    </p>
                )}
            </div>

            {/* ACTION */}
            <button
                onClick={() => onEmailSubmit(email)}
                disabled={!email || !selectedChoice || status === "LOADING"}
                className="w-full flex items-center justify-center py-3 px-6 bg-transparent border border-anthracite rounded-[2px] font-sans text-[15px] text-anthracite uppercase tracking-wide hover:bg-anthracite hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cuivre disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "LOADING" ? (
                    <>
                        <Loader2 className="animate-spin w-4 h-4 mr-2 text-cuivre" />
                        Transmission...
                    </>
                ) : (
                    "Transmettre"
                )}
            </button>
        </div>
    );
}

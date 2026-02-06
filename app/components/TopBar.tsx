"use client";

import React from "react";

export default function TopBar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-4 pt-2 pb-2 bg-blanc-casse border-b border-line box-border h-[var(--topbar-height)]">
            {/* GAUCHE */}
            <div className="flex flex-col">
                <h1 className="font-sans text-[14px] font-normal uppercase tracking-widest text-anthracite leading-tight">
                    Musée Digital
                </h1>
                <span className="font-sans text-[10px] uppercase tracking-widest text-ink-2 mt-1">
                    Exposition Temporaire — Portfolio de Jérémy Van Diest
                </span>
            </div>

            {/* CENTRE - Vide */}
            <div className="hidden md:block w-px h-6"></div>

            {/* DROITE */}
            <div className="flex items-center text-right">
                <span className="hidden md:inline-block font-sans text-[10px] uppercase tracking-widest text-ink-2 mr-6">
                    Bruxelles — 2026
                </span>
                <a
                    href="mailto:jeremyvandiest.prod@gmail.com"
                    className="font-sans text-[14px] text-ink-2 hover:text-cuivre transition-colors duration-300"
                >
                    CONTACT
                </a>
            </div>
        </nav>
    );
}

"use client";

import React, { ReactNode } from "react";

type CartelProps = {
    artefactNumber: string;
    title: string;
    medium: string;
    description: string;
    children?: ReactNode; // For extra content like form
};

export default function Cartel({
    artefactNumber,
    title,
    medium,
    description,
    children,
}: CartelProps) {
    return (
        <article className="grain-paper relative bg-blanc-casse border border-line/15 border-l-4 border-l-cuivre rounded-[2px] p-10 max-w-[560px] shadow-paper mx-auto md:mx-0">
            <div className="relative z-10">
                <div className="font-sans text-[10px] uppercase tracking-widest text-ink-2 mb-6">
                    {artefactNumber}
                </div>
                <h2 className="font-serif text-[28px] font-semibold text-anthracite mb-3 tracking-wide">
                    {title}
                </h2>
                <div className="font-sans text-[12px] uppercase tracking-widest text-ink-2 mb-5">
                    {medium}
                </div>

                <hr className="border-t border-line mb-5" />

                <p className="font-sans text-[16px] leading-[1.75] text-ink-warm max-w-[56ch] mb-4 whitespace-pre-line">
                    {description}
                </p>

                {children && <div className="mt-8">{children}</div>}
            </div>
        </article>
    );
}

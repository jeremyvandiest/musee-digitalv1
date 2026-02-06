"use client";

import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import NavigationBar from "./components/NavigationBar";
import Slider from "./components/Slider";
import { MoveUpRight } from "lucide-react";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = 6;

    const handleNext = () => {
        if (currentIndex < totalSlides - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "ArrowLeft") {
                handlePrev();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    return (
        // MAIN: min-h-screen, standard scroll
        <main className="min-h-screen w-full bg-wall relative selection:bg-cuivre selection:text-white">
            <TopBar />

            {/* SECTION MUSÉE: Standard min-h-full */}
            <section className="min-h-screen relative flex flex-col">
                <Slider currentIndex={currentIndex} />
            </section>

            {/* SECTION ARCHIVES: Standard min-h-full */}
            <section className="relative grain-paper bg-beige py-[120px] min-h-screen">
                <div className="max-w-[1200px] mx-auto px-10 relative z-10">
                    <h2 className="font-serif text-[24px] text-cuivre text-center mb-[60px]">
                        ARCHIVES & TRAVAUX
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[60px]">
                        {/* COLONNE 1 : PARCOURS */}
                        <div>
                            <h3 className="font-sans text-[10px] uppercase text-ink-2 mb-4 tracking-widest">
                                PARCOURS
                            </h3>
                            <p className="font-sans text-[16px] leading-[1.75] text-ink-warm max-w-[56ch] whitespace-pre-line">
                                Régisseur audiovisuel durant quatre années (RTBF, productions
                                cinématographiques, séries télévisées). Transition vers la
                                direction artistique digitale et le community management pour
                                marques premium de bien-être.
                            </p>
                        </div>

                        {/* COLONNE 2 : NOTICE CURATORIALE (ARTEFACT 004) */}
                        <div>
                            <h3 className="font-sans text-[10px] uppercase text-ink-2 mb-4 tracking-widest">
                                NOTICE D'INSTALLATION
                            </h3>
                            <div className="font-sans text-[14px] font-bold text-anthracite mb-1 uppercase tracking-tight">
                                Le Texte Optimisé (La Fatigue de l'Authenticité)
                            </div>
                            <div className="font-sans text-[10px] uppercase text-ink-2 mb-4 tracking-widest">
                                INSTALLATION INTERACTIVE, AUTOMATISATION IA — 2026
                            </div>
                            <p className="font-sans text-[14px] leading-[1.6] text-ink-warm max-w-[56ch] whitespace-pre-line">
                                L'installation propose trois protocoles algorithmiques distincts, chacun reproduisant une mécanique du système de recrutement contemporain.
                                {"\n\n"}
                                <span className="text-anthracite font-medium">Protocole A — "Optimiser ma candidature"</span>
                                {"\n"}Génère une réponse standardisée via intelligence artificielle. Le système produit un texte optimisé, poli, impersonnel — exactement comme le ferait un algorithme de recrutement corporate.
                                {"\n\n"}
                                <span className="text-anthracite font-medium">Protocole B — "Contourner l'algorithme"</span>
                                {"\n"}Archive publiquement la tentative sur les réseaux sociaux. La participation devient visible, documentée, exposée — transformant l'acte privé de candidature en donnée sociale consultable.
                                {"\n\n"}
                                <span className="text-anthracite font-medium">Protocole C — "Envoyer ma donnée dans le vide"</span>
                                {"\n"}Honore le ghosting dans sa forme absolue : le silence. Aucune réponse. Aucun accusé de réception. L'action est enregistrée, puis disparaît dans le système sans retour.
                                {"\n\n"}
                                En détournant les outils de l'automatisation RH — génération de texte, API, tracking — l'œuvre questionne la transformation du candidat en donnée et la fatigue de l'authenticité dans un système qui promet l'efficacité au prix de l'unicité.
                                {"\n\n"}
                                La seule différence avec le vrai système : ici, le vide assume qu'il est une œuvre.
                            </p>
                        </div>

                        {/* COLONNE 3 : CATALOGUE + TRAVAUX */}
                        <div id="catalogue">
                            <div className="mb-10">
                                <h3 className="font-sans text-[10px] uppercase text-ink-2 mb-3 tracking-widest">
                                    CATALOGUE
                                </h3>
                                <a
                                    href="#"
                                    className="font-sans text-[14px] text-anthracite hover:text-cuivre hover:underline transition-colors block mb-6"
                                >
                                    Série Propagande Douce (14 affiches)
                                </a>
                            </div>

                            <div>
                                <h3 className="font-sans text-[10px] uppercase text-ink-2 mb-6 tracking-widest">
                                    AUTRES TRAVAUX
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {[
                                        {
                                            name: "Flow Force",
                                            desc: "Direction artistique coaching",
                                        },
                                        {
                                            name: "Minaloe",
                                            desc: "Stratégie marque wellness",
                                        },
                                        {
                                            name: "Dionysos Suspendu",
                                            desc: "Court-métrage expérimental",
                                        },
                                    ].map((job, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="group block bg-blanc-casse border border-line/30 rounded-[2px] p-6 transition-all duration-300 hover:border-cuivre hover:-translate-y-px"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-serif text-[18px] text-anthracite group-hover:text-cuivre transition-colors">
                                                    {job.name}
                                                </span>
                                                <MoveUpRight className="w-4 h-4 text-line group-hover:text-cuivre transition-colors" />
                                            </div>
                                            <span className="font-sans text-[12px] text-ink-2 uppercase tracking-wide">
                                                {job.desc}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-[60px] flex justify-center gap-6">
                        {["LINKEDIN", "BEHANCE", "CONTACT"].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="font-sans text-[14px] uppercase text-anthracite hover:text-cuivre hover:underline tracking-widest"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <NavigationBar
                currentIndex={currentIndex}
                totalSlides={totalSlides}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </main>
    );
}

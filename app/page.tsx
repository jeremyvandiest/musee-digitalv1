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

            {/* SECTION ARCHIVES: Standard min-h-screen */}
            <section className="relative grain-paper bg-beige py-[120px] min-h-screen border-t border-line/10">
                <div className="max-w-[1240px] mx-auto px-10 relative z-10">
                    <h2 className="font-serif text-[28px] text-cuivre text-center mb-[80px] tracking-wide uppercase">
                        Archives & Compétences
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
                        {/* COLONNE 1 : PARCOURS */}
                        <div className="flex flex-col gap-6 text-justify">
                            <h3 className="font-sans text-[11px] uppercase text-ink-2 tracking-[0.2em] border-b border-line/10 pb-4">
                                PARCOURS
                            </h3>
                            <div className="font-sans text-[16px] leading-[1.8] text-ink-warm flex flex-col gap-6">
                                <p>
                                    Régisseur audiovisuel durant quatre années sur des productions exigeantes (RTBF, cinéma, séries télévisées). Cette expérience de terrain a consisté à coordonner la logistique des tournages — lieux, transports, installations extérieures, besoins des équipes — afin d’assurer la continuité et le bon déroulement de la création.
                                </p>
                                <p>
                                    Ce travail au cœur de dispositifs complexes a forgé une culture de l’anticipation, de la rigueur et de la coordination invisible. La gestion des contraintes, des protocoles et des imprévus a progressivement conduit vers des pratiques plus autonomes, transposées aujourd’hui à la direction artistique digitale et au community management pour marques premium de bien-être.
                                </p>
                            </div>
                        </div>

                        {/* COLONNE 2 : ORIGINE DU PROJET */}
                        <div className="flex flex-col gap-6 text-justify">
                            <h3 className="font-sans text-[11px] uppercase text-ink-2 tracking-[0.2em] border-b border-line/10 pb-4">
                                ORIGINE DU PROJET
                            </h3>
                            <div className="font-sans text-[16px] leading-[1.8] text-ink-warm flex flex-col gap-6">
                                <p>
                                    Ce musée digital est conçu comme une candidature inversée. Là où le système attend des réponses optimisées, il propose une exposition critique.
                                </p>
                                <p>
                                    Chaque artefact isole un mécanisme du recrutement contemporain — algorithmes, ghosting institutionnel, injonctions paradoxales, invisibilité administrative — et le transforme en expérience lisible et documentée.
                                </p>
                                <p className="italic text-ink-2/80 pt-2 border-t border-line/5">
                                    L’ensemble du dispositif a été conçu, écrit, produit, automatisé et déployé par <strong className="text-anthracite font-semibold">Jérémy Van Diest</strong>.
                                </p>
                            </div>
                        </div>

                        {/* COLONNE 3 : COMPÉTENCES APPLIQUÉES */}
                        <div className="flex flex-col gap-6">
                            <h3 className="font-sans text-[11px] uppercase text-ink-2 tracking-[0.2em] border-b border-line/10 pb-4">
                                COMPÉTENCES APPLIQUÉES
                            </h3>
                            <div className="flex flex-col gap-8">
                                {[
                                    {
                                        title: "Direction artistique & production",
                                        desc: "Conception d’univers visuels cohérents et direction de production pour formats narratifs, publicitaires et vidéos courtes."
                                    },
                                    {
                                        title: "Narration & copywriting",
                                        desc: "Traduction de positionnements en récits clairs et sensibles. Micro-copy, rédaction éditoriale et optimisation SEO."
                                    },
                                    {
                                        title: "Création de contenus",
                                        desc: "Production de formats narratifs (carrousels, reels, vidéos) pensés pour la désirabilité et la continuité éditoriale."
                                    },
                                    {
                                        title: "Community management stratégique",
                                        desc: "Définition de lignes éditoriales, ton de voix, rythmes de publication et gestion relationnelle sur le long terme."
                                    },
                                    {
                                        title: "Structuration & automatisation",
                                        desc: "Conception de flux complexes et mise en place de systèmes automatisés (Make, n8n, IA) visant à réduire la friction."
                                    }
                                ].map((skill, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cuivre/40 mt-2.5 flex-shrink-0" />
                                        <div className="flex flex-col gap-1">
                                            <span className="font-sans text-[14px] font-bold text-anthracite uppercase tracking-wide">{skill.title}</span>
                                            <span className="font-sans text-[14px] text-ink-warm leading-[1.6]">{skill.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* COLONNE 4 : APPLICATIONS CONCRÈTES */}
                        <div className="flex flex-col gap-6">
                            <h3 className="font-sans text-[11px] uppercase text-ink-2 tracking-[0.2em] border-b border-line/10 pb-4">
                                APPLICATIONS CONCRÈTES
                            </h3>
                            <div className="flex flex-col gap-8">
                                {/* Flow Force */}
                                <div className="group bg-blanc-casse/50 border-l-2 border-l-cuivre p-6 shadow-sm hover:shadow-md transition-all">
                                    <h4 className="font-serif text-[20px] text-anthracite mb-2">Flow Force — DA & Contenus</h4>
                                    <p className="font-sans text-[14px] text-ink-2 leading-[1.6] mb-4">
                                        Coaching embodiment : identité visuelle, stratégie de contenu, production de formats courts, workflows automatisés.
                                    </p>
                                    <a
                                        href="https://www.instagram.com/flow.force.coaching/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-sans text-[12px] text-cuivre font-medium hover:underline"
                                    >
                                        INSTAGRAM <MoveUpRight className="w-3 h-3" />
                                    </a>
                                </div>

                                {/* Minaloe */}
                                <div className="group bg-blanc-casse/50 border-l-2 border-l-cuivre p-6 shadow-sm hover:shadow-md transition-all">
                                    <h4 className="font-serif text-[20px] text-anthracite mb-2">Minaloe / Ashitaba — Stratégie</h4>
                                    <p className="font-sans text-[14px] text-ink-2 leading-[1.6] mb-4">
                                        Compléments alimentaires premium : positionnement, storytelling produit, CM et contenus narratifs.
                                    </p>
                                    <a
                                        href="https://www.instagram.com/ashitaba_minaloe/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-sans text-[12px] text-cuivre font-medium hover:underline"
                                    >
                                        INSTAGRAM <MoveUpRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-32 pt-10 border-t border-line/10 flex flex-wrap justify-center gap-x-12 gap-y-6">
                        {["LINKEDIN", "BEHANCE"].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="font-sans text-[11px] uppercase text-ink-2 hover:text-cuivre hover:underline tracking-[0.2em] transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                        <a
                            href="/cv-jeremy-vandiest.pdf"
                            target="_blank"
                            className="font-sans text-[11px] uppercase text-ink-2 hover:text-cuivre hover:underline tracking-[0.2em] transition-colors"
                        >
                            CV
                        </a>
                        <a
                            href="mailto:jeremyvandiest.prod@gmail.com"
                            className="font-sans text-[11px] uppercase text-ink-2 hover:text-cuivre hover:underline tracking-[0.2em] transition-colors"
                        >
                            CONTACT
                        </a>
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

"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoControls from "./VideoControls";
import Cartel from "./Cartel";
import CarouselStories from "./CarouselStories";
import FormSlide4 from "./FormSlide4";
import CartelForm from "./CartelForm";

// Images placeholders (using colors or text)
type SlideData = {
    id: number;
    roomLabel: string;
    type: "image" | "video" | "form" | "carousel";
    mediaContent?: ReactNode;
    cartel: {
        artefactNumber: string;
        title: string;
        medium: string;
        description: string;
        hasForm?: boolean;
    };
};

type SliderProps = {
    currentIndex: number;
};

export default function Slider({ currentIndex }: SliderProps) {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean[]>([false, false, false, false, false, false]);
    const [isMuted, setIsMuted] = useState<boolean[]>([false, false, false, false, false, false]);

    // --- FORM STATE (Lifted) ---
    const [formChoice, setFormChoice] = useState<"A" | "B" | "C" | null>(null);
    const [formStatus, setFormStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE");
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

    // Lightbox State
    const [expandedMedia, setExpandedMedia] = useState<{ type: "image" | "video", src: string } | null>(null);

    const handleFormSubmit = async (email: string) => {
        setFormStatus("LOADING");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFormStatus("SUCCESS");
        setIsEmailSubmitted(true);
    };

    // --- LOGIC: Video Handling ---
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            if (index === currentIndex) {
                // Attempt play
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying((prev) => {
                                const copy = [...prev];
                                copy[index] = true;
                                return copy;
                            });
                        })
                        .catch(() => {
                            setIsPlaying((prev) => {
                                const copy = [...prev];
                                copy[index] = false;
                                return copy;
                            });
                        });
                }
            } else {
                video.pause();
                setIsPlaying((prev) => {
                    const copy = [...prev];
                    copy[index] = false;
                    return copy;
                });
            }
        });
    }, [currentIndex]);

    const togglePlay = (index: number) => {
        const video = videoRefs.current[index];
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying((prev) => {
                const copy = [...prev];
                copy[index] = true;
                return copy;
            });
        } else {
            video.pause();
            setIsPlaying((prev) => {
                const copy = [...prev];
                copy[index] = false;
                return copy;
            });
        }
    };

    const toggleMute = (index: number) => {
        const video = videoRefs.current[index];
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted((prev) => {
            const copy = [...prev];
            copy[index] = !copy[index];
            return copy;
        });
    };

    // --- DATA ---
    const getSlideContent = (index: number) => {
        // Wrapper styles common to media - Top aligned with tight padding
        const mediaWrapperClass = "relative w-full h-full flex items-start justify-center p-2 pt-2 md:pt-4 overflow-hidden";

        // Sizing: same aspect, constrained width. Added border/shadow for consistent "encadrement"
        const mediaFrameBase = "relative w-full max-w-[500px] xl:max-w-[560px] aspect-[9/16] h-auto max-h-[calc(100vh-var(--topbar-height)-var(--bottombar-height)-60px)] transition-all duration-500 overflow-hidden";

        switch (index) {
            case 0: // Slide 1: CV (Image) - Oeuvre1.png
                return (
                    <div className={mediaWrapperClass}>
                        {/* Clickable Image for Lightbox */}
                        <div
                            className={`${mediaFrameBase} flex items-center justify-center bg-transparent cursor-zoom-in group`}
                            onClick={() => setExpandedMedia({ type: "image", src: "/Oeuvre1.png" })}
                        >
                            <img
                                src="/Oeuvre1.png"
                                alt="Autoportrait Administratif"
                                className="w-full h-full object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            {/* Zoom Hint */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="bg-white/80 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest text-anthracite rounded-full shadow-sm">
                                    Agrandir
                                </span>
                            </div>
                        </div>
                    </div>
                );
            case 1: // Slide 2: Video 1 - Oeuvre2.mp4
            case 2: // Slide 3: Video 2 - Oeuvre3.mp4
            case 5: // Slide 6: ASMR - Placeholder for now

                const videoSrc = index === 1 ? "/Oeuvre2.mp4" : (index === 2 ? "/Oeuvre3.mp4" : "/videos/asmr_placeholder.mp4");

                return (
                    <div className={mediaWrapperClass}>

                        <div className={`${mediaFrameBase} bg-transparent overflow-hidden relative`}>
                            <video
                                ref={(el) => { videoRefs.current[index] = el; }}
                                className="w-full h-full object-contain block"
                                playsInline
                                webkit-playsinline="true"
                                autoPlay
                                muted
                                loop
                                preload={currentIndex === index ? "auto" : "metadata"}
                            >
                                <source src={videoSrc} type="video/mp4" />
                                Votre navigateur ne supporte pas la lecture de vidéos.
                            </video>
                            <VideoControls
                                isPlaying={isPlaying[index]}
                                isMuted={isMuted[index]}
                                onTogglePlay={() => togglePlay(index)}
                                onToggleMute={() => toggleMute(index)}
                                onExpand={() => setExpandedMedia({ type: "video", src: videoSrc })}
                            />
                        </div>
                    </div>
                );
            case 3: // Slide 4: System (Form) - SAME 9:16 FRAME
                return (
                    // On mobile, stick to items-center (standard). On desktop, items-start (top align).
                    <div className={`relative w-full h-full flex ${index === 3 ? "items-start pt-0 mt-0" : "items-start pt-0"} justify-center p-2 overflow-hidden`}>
                        {/* Pass class for consistent sizing */}
                        <FormSlide4
                            className={`${mediaFrameBase}`}
                            selectedChoice={formChoice}
                            onSelectChoice={setFormChoice}
                            isEmailSubmitted={isEmailSubmitted}
                        />
                    </div>
                );
            case 4: // Slide 5: Carousel
                return (
                    <div className={mediaWrapperClass}>
                        {/* Pass class for consistent sizing */}
                        <CarouselStories
                            className={mediaFrameBase}
                            onExpand={(src) => setExpandedMedia({ type: "image", src })}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    const roomLabels = [
        "SALLE 01 — ADMINISTRATION",
        "SALLE 02 — PRÉSENCE",
        "SALLE 03 — IMMOBILITÉ",
        "SALLE 04 — SYSTÈME",
        "SALLE 05 — INJONCTIONS",
        "SALLE 06 — ARCHÉOLOGIE SONORE"
    ];

    const getCartelContent = (index: number) => {
        switch (index) {
            case 0:
                return {
                    artefactNumber: roomLabels[0],
                    title: "Autoportrait Administratif",
                    medium: "GRAPHISME ÉDITORIAL — 2026",
                    description: "Ce document constitue le point d'entrée de l'exposition. Le curriculum vitae n'est plus un outil fonctionnel, mais un objet culturel normé : une pièce d'archive.\n\nLes codes de l'institution — hiérarchie, lisibilité, neutralité — mettent en évidence la réduction de l'individu à un format standardisé. Le CV devient un autoportrait contraint. L'œuvre pose la question : que reste-t-il d'un individu résumé à une page optimisée pour être triée, puis oubliée."
                };
            case 1:
                return {
                    artefactNumber: roomLabels[1],
                    title: "Fais Exister Ta Marque",
                    medium: "FILM MANIFESTE — 2026",
                    description: "Un film manifeste sur le rôle du Community Manager. Sans mots ni logos, l'œuvre montre comment un produit brut devient désirable par le travail invisible de celui qui lui donne voix et présence.\n\nDans le contexte de l'exposition, le produit devient métaphore du candidat. Rien ne change dans la substance ; tout se joue dans la mise en scène. L'œuvre affirme que la valeur se crée par le regard et la capacité à générer une perception."
                };
            case 2:
                return {
                    artefactNumber: roomLabels[2],
                    title: "Immobile",
                    medium: "FILM CONTEMPLATIF — 2026",
                    description: "« The outside stands still. The inside insists. »\n\nUn homme, filmé en plongée zénithale, demeure parfaitement immobile tandis que le monde continue de se mouvoir et de le contourner. Il traverse différents environnements — administratifs, urbains, naturels — jusqu'à atteindre un espace où son immobilité cesse d'être une anomalie.\n\nDans la recherche d'emploi, l'immobilité n'est pas une absence d'effort, mais un temps suspendu où l'action ne produit plus de réponse."
                };
            case 3:
                return {
                    artefactNumber: roomLabels[3] + " — 1",
                    title: "Systèmes Automatisés",
                    medium: "INSTALLATION INTERACTIVE — 2026",
                    description: "Vous êtes invité à participer à cette œuvre en entrant votre adresse email, puis en sélectionnant un ou plusieurs protocoles d'interactions avec le système en cours.\n\nChaque choix déclenche un traitement unique, automatisé et archivé.\n\nL’œuvre détourne l’automatisation RH pour montrer le candidat réduit à une donnée, et assume le vide comme œuvre.",
                    hasForm: true
                };
            case 4:
                return {
                    artefactNumber: roomLabels[4],
                    title: "Le Dogme du Succès",
                    medium: "SÉRIE INSTAGRAM — 2026",
                    description: "Ce carrousel détourne le format des conseils professionnels sur réseaux sociaux. Là où ce format promet des solutions claires, l'œuvre opère un renversement : elle expose sans résoudre.\n\nChaque slide se présente comme une affiche institutionnelle. Sous cette surface rassurante, le texte révèle des injonctions paradoxales adressées au candidat contemporain. L'œuvre imite et amplifie les codes jusqu'à rendre visibles leurs contradictions internes."
                };
            case 5:
                return {
                    artefactNumber: roomLabels[5],
                    title: "ASMR du Ghosting",
                    medium: "VIDÉO SONORE — 2026",
                    description: "Une exploration sonore du silence institutionnel. L'œuvre documente la dimension acoustique du rituel de candidature : aligner un CV, poser les doigts sur un clavier, cliquer sur \"Envoyer\", puis attendre.\n\nLa bande-son isole les micro-événements auditifs : froissement de papier, clic de souris, scroll d'inbox vide, silence prolongé. L'ASMR devient ici un langage administratif intime. Ce que l'on entend n'est pas le silence, mais sa fabrication"
                };
            default:
                return { artefactNumber: "", title: "", medium: "", description: "" };
        }
    };

    const curatorialNotice = `L'installation propose trois protocoles algorithmiques reproduisant les mécaniques du recrutement contemporain :

<span class="font-bold">Optimiser ma candidature</span>
En cliquant, vous recevez un email automatisé contenant une réponse générée par IA et sans intervention humaine directe.

<span class="font-bold">Contourner l'algorithme</span>
Une publication publique est générée et diffusée dans la minute sur le profil
 <a href="https://www.instagram.com/jeremyvandiest/" target="_blank" rel="noopener noreferrer" class="text-cuivre hover:underline decoration-cuivre/30">https://www.instagram.com/jeremyvandiest/</a>

<span class="font-bold">Envoyer ma donnée dans le vide</span>
Honore le ghosting absolu : le silence. Aucune réponse. Aucun accusé de réception.
L'action est enregistrée, puis disparaît du système sans retour.`;

    const cartelData = getCartelContent(currentIndex);

    return (
        // STANDARD SCROLL: No snap, just min-h-screen
        <div className="relative w-full min-h-screen flex flex-col pt-[var(--topbar-height)] pb-[var(--bottombar-height)]">

            {/* Main Content Area */}
            <div className="relative flex-1 flex flex-col items-center justify-start w-full h-full">

                {/* AnimatePresence for Transitions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row w-full h-full max-w-[1200px] mx-auto gap-4 md:gap-6 lg:gap-8 items-start justify-center"
                    >
                        {/* Left Column: Media */}
                        <div className={`flex-1 flex p-2 relative h-full w-full z-10 order-1 md:order-1 
                            ${currentIndex === 3 ? "md:max-w-[25%] items-start justify-end pt-0 mt-0" : "md:max-w-[45%] items-start justify-end pt-0"}`}>
                            {getSlideContent(currentIndex)}
                        </div>

                        {/* Mobile Divider */}
                        <div className="md:hidden w-full h-px bg-line my-0 mx-6 opacity-30 order-2" />

                        {/* Right Column: Cartel(s) */}
                        <div className={`flex-1 flex p-6 md:p-10 z-10 order-3 md:order-2 w-full 
                            ${currentIndex === 3 ? "md:max-w-[70%] items-start justify-center pt-0 mt-0" : "md:max-w-[45%] items-start justify-start pt-0"}`}>

                            {currentIndex === 3 ? (
                                <div className="flex flex-col lg:flex-row gap-6 items-stretch scale-90 lg:scale-[0.8] xl:scale-75 origin-top-left">
                                    {/* CARTEL 1 */}
                                    <div className="flex-shrink-0 flex">
                                        <Cartel
                                            artefactNumber={cartelData.artefactNumber}
                                            title={cartelData.title}
                                            medium={cartelData.medium}
                                            description={cartelData.description}
                                            className="h-full"
                                        >
                                            <CartelForm
                                                selectedChoice={formChoice}
                                                onEmailSubmit={handleFormSubmit}
                                                status={formStatus}
                                            />
                                        </Cartel>
                                    </div>

                                    {/* CARTEL 2 (Curatorial Notice) */}
                                    <div className="flex-shrink-0 flex">
                                        <Cartel
                                            artefactNumber={roomLabels[3] + " — 2"}
                                            title="Systèmes Automatisés"
                                            medium="AUTOMATISATION IA — 2026"
                                            description={curatorialNotice}
                                            className="h-full"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <Cartel
                                    artefactNumber={cartelData.artefactNumber}
                                    title={cartelData.title}
                                    medium={cartelData.medium}
                                    description={cartelData.description}
                                />
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* LIGHTBOX OVERLAY */}
            <AnimatePresence>
                {expandedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-wall/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                        onClick={() => setExpandedMedia(null)}
                    >
                        {expandedMedia.type === "image" ? (
                            <motion.img
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                src={expandedMedia.src}
                                className="max-w-full max-h-full object-contain shadow-2xl"
                            />
                        ) : (
                            <motion.video
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                src={expandedMedia.src}
                                className="max-w-full max-h-full object-contain shadow-2xl"
                                autoPlay
                                loop
                                controls
                            />
                        )}
                        <button
                            className="absolute top-6 right-6 text-ink-2 hover:text-cuivre transition-colors"
                            onClick={() => setExpandedMedia(null)}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

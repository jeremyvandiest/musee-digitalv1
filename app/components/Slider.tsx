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
    const [isPlaying, setIsPlaying] = useState<boolean[]>(new Array(6).fill(false));
    const [isMuted, setIsMuted] = useState<boolean[]>(new Array(6).fill(true));
    const [showOverlay, setShowOverlay] = useState<boolean[]>(new Array(6).fill(false));

    // --- FORM STATE (Lifted) ---
    const [formChoice, setFormChoice] = useState<"A" | "B" | "C" | null>(null);
    const [formStatus, setFormStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE");

    // Lightbox State
    const [expandedImage, setExpandedImage] = useState<string | null>(null);

    const handleFormSubmit = async (email: string) => {
        setFormStatus("LOADING");
        try {
            const res = await fetch("/api/participate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    choice: formChoice,
                    source: "musee-digital",
                    createdAt: new Date().toISOString(),
                }),
            });
            if (res.ok) setFormStatus("SUCCESS");
            else setFormStatus("ERROR");
        } catch {
            setFormStatus("ERROR");
        }
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
                            setShowOverlay((prev) => {
                                const copy = [...prev];
                                copy[index] = false;
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

    // Fallback Autoplay Detection
    useEffect(() => {
        const video = videoRefs.current[currentIndex];
        if (!video) return;

        const timer = setTimeout(() => {
            if (video.readyState < 2 || video.paused) {
                setShowOverlay((prev) => {
                    const copy = [...prev];
                    copy[currentIndex] = true;
                    return copy;
                });
            }
        }, 2000); // Increased to 2s for mobile loading

        return () => clearTimeout(timer);
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
            setShowOverlay((prev) => {
                const copy = [...prev];
                copy[index] = false;
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
        // Wrapper styles common to media
        const mediaWrapperClass = "relative w-full h-full flex items-center justify-center bg-paper-warm p-2 overflow-hidden";

        // Sizing: same aspect, constrained width.
        const mediaFrameBase = "relative w-full max-w-[500px] xl:max-w-[560px] aspect-[9/16] h-auto max-h-[calc(100vh-var(--topbar-height)-var(--bottombar-height)-60px)] transition-all duration-500 overflow-hidden";

        switch (index) {
            case 0: // Slide 1: CV (Image) - Oeuvre1.png
                return (
                    <div className={mediaWrapperClass}>
                        <span className="absolute top-4 left-4 md:top-8 md:left-8 text-[10px] text-ink-2 tracking-widest z-10 mix-blend-difference text-white/70 md:text-ink-2 md:mix-blend-normal">
                            01/06
                        </span>
                        {/* Clickable Image for Lightbox */}
                        <div
                            className={`${mediaFrameBase} flex items-center justify-center bg-transparent cursor-zoom-in group`}
                            onClick={() => setExpandedImage("/Oeuvre1.png")}
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
                        <span className="absolute top-4 left-4 md:top-8 md:left-8 text-[10px] text-ink-2 tracking-widest z-10 mix-blend-difference text-white/70 md:text-ink-2 md:mix-blend-normal">
                            0{index + 1}/06
                        </span>

                        <div className={`${mediaFrameBase} bg-transparent overflow-hidden relative`}>
                            <video
                                ref={(el) => { videoRefs.current[index] = el; }}
                                className="w-full h-full object-contain block"
                                src={videoSrc}
                                playsInline
                                autoPlay
                                muted
                                loop
                                preload={currentIndex === index ? "auto" : "metadata"}
                            />
                            <VideoControls
                                isPlaying={isPlaying[index]}
                                isMuted={isMuted[index]}
                                onTogglePlay={() => togglePlay(index)}
                                onToggleMute={() => toggleMute(index)}
                            />
                            {showOverlay[index] && (
                                <div
                                    className="absolute inset-0 bg-transparent z-20 flex items-center justify-center cursor-pointer"
                                    onClick={() => togglePlay(index)}
                                >
                                    <span className="font-sans text-[12px] uppercase tracking-wide text-white border border-white/50 bg-black/20 backdrop-blur-md px-4 py-2 rounded-[2px] hover:bg-white hover:text-anthracite transition-colors">
                                        Activer la lecture
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 3: // Slide 4: System (Form) - SAME 9:16 FRAME
                return (
                    // On mobile, stick to items-center (standard). On desktop, items-start (top align).
                    <div className={`relative w-full h-full flex ${index === 3 ? "items-center md:items-start pt-0" : "items-center"} justify-center bg-paper-warm p-2 overflow-hidden`}>
                        <span className="absolute top-4 left-4 md:top-8 md:left-8 text-[10px] text-ink-2 tracking-widest z-10">
                            04/06
                        </span>
                        {/* Pass class for consistent sizing */}
                        <FormSlide4
                            className={`${mediaFrameBase}`}
                            selectedChoice={formChoice}
                            onSelectChoice={setFormChoice}
                        />
                    </div>
                );
            case 4: // Slide 5: Carousel
                return (
                    <div className={mediaWrapperClass}>
                        <span className="absolute top-4 left-4 md:top-8 md:left-8 text-[10px] text-ink-2 tracking-widest z-10">
                            05/06
                        </span>
                        {/* Pass class for consistent sizing */}
                        <CarouselStories className={mediaFrameBase} />
                    </div>
                );
            default:
                return null;
        }
    };

    const getCartelContent = (index: number) => {
        switch (index) {
            case 0:
                return {
                    artefactNumber: "ARTEFACT 001",
                    title: "Autoportrait Administratif",
                    medium: "GRAPHISME ÉDITORIAL — 2026",
                    description: "Un curriculum vitae transformé en œuvre graphique. La donnée administrative devient forme visuelle, le parcours professionnel devient récit contemplatif."
                };
            case 1:
                return {
                    artefactNumber: "ARTEFACT 002",
                    title: "Titre Œuvre 2",
                    medium: "VIDÉO — 2026",
                    description: "Description œuvre 2 - placeholder contemplation."
                };
            case 2:
                return {
                    artefactNumber: "ARTEFACT 003",
                    title: "Titre Œuvre 3",
                    medium: "VIDÉO — 2026",
                    description: "Description œuvre 3 - placeholder."
                };
            case 3:
                return {
                    artefactNumber: "ARTEFACT 004",
                    title: "Système de Ghosting Automatisé",
                    medium: "INSTALLATION INTERACTIVE — 2026",
                    description: "Vous êtes invité à participer à cette œuvre critique en sélectionnant votre protocole d'interaction avec le système algorithmique. Chaque choix déclenche une réaction invisible et archivée.",
                    hasForm: true
                };
            case 4:
                return {
                    artefactNumber: "ARTEFACT 005",
                    title: "Propagande Douce",
                    medium: "SÉRIE INSTAGRAM, 6 CARROUSELS SÉLECTIONNÉS — 2026",
                    description: "Déconstruction des injonctions paradoxales de la recherche d'emploi contemporaine. Chaque carrousel démonte un conseil toxique en utilisant l'esthétique même du discours motivationnel. Série complète : 14 affiches."
                };
            case 5:
                return {
                    artefactNumber: "ARTEFACT 006",
                    title: "ASMR du Ghosting",
                    medium: "VIDÉO SONORE, 90 SECONDES — 2026",
                    description: "Une installation vidéo ASMR explorant la dimension sonore du silence algorithmique dans les processus de recrutement automatisés. Chaque geste méticuleux devient rituel d'attente suspendue."
                };
            default:
                return { artefactNumber: "", title: "", medium: "", description: "" };
        }
    };

    const cartelData = getCartelContent(currentIndex);
    const roomLabels = [
        "SALLE 01 — ADMINISTRATION",
        "SALLE 02 — PRÉSENCE",
        "SALLE 03 — IMMOBILITÉ",
        "SALLE 04 — SYSTÈME",
        "SALLE 05 — INJONCTIONS",
        "SALLE 06 — ARCHÉOLOGIE SONORE"
    ];

    return (
        // STANDARD SCROLL: No snap, just min-h-screen
        <div className="relative w-full min-h-screen flex flex-col pt-[var(--topbar-height)] pb-[var(--bottombar-height)]">
            {/* Label Salle */}
            <div className="w-full px-6 md:px-10 lg:px-12 mb-2 mt-4 md:mt-8 text-center md:text-left z-10 transition-opacity duration-300">
                <h2 className="font-sans text-[12px] uppercase tracking-wide text-ink-2">
                    {roomLabels[currentIndex]}
                </h2>
            </div>

            {/* Main Content Area */}
            <div className="relative flex-1 flex flex-col items-center justify-center w-full h-full">
                {/* Divider Vertical - Centered */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-px bg-line/18 h-auto z-0" />

                {/* AnimatePresence for Transitions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        // Force items-center on mobile to avoid jumping. Only md:items-start for index 3.
                        className={`flex flex-col md:flex-row w-full h-full max-w-[1200px] mx-auto gap-4 md:gap-8 lg:gap-12 
                  ${currentIndex === 3 ? "items-center justify-center md:items-start" : "items-center justify-center"}`}
                    >
                        {/* Left Column: Media */}
                        <div className={`flex-1 flex p-2 relative h-full w-full md:max-w-[45%] z-10 order-1 md:order-1 
                            ${currentIndex === 3 ? "items-center justify-end md:items-start md:justify-end md:mt-16" : "items-center justify-end"}`}>
                            {getSlideContent(currentIndex)}
                        </div>

                        {/* Mobile Divider */}
                        <div className="md:hidden w-full h-px bg-line my-0 mx-6 opacity-30 order-2" />

                        {/* Right Column: Cartel */}
                        <div className={`flex-1 flex p-6 md:p-10 z-10 order-3 md:order-2 w-full md:max-w-[45%]
                            ${currentIndex === 3 ? "items-center justify-start md:items-start md:justify-start" : "items-center justify-start"}`}>
                            {/* Scale down Cartel for Slide 4 to 75% */}
                            <div className={`${currentIndex === 3 ? "scale-75 origin-top-left" : ""}`}>
                                <Cartel
                                    artefactNumber={cartelData.artefactNumber}
                                    title={cartelData.title}
                                    medium={cartelData.medium}
                                    description={cartelData.description}
                                >
                                    {currentIndex === 3 && (
                                        <CartelForm
                                            selectedChoice={formChoice}
                                            onEmailSubmit={handleFormSubmit}
                                            status={formStatus}
                                        />
                                    )}
                                </Cartel>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* LIGHTBOX OVERLAY */}
            <AnimatePresence>
                {expandedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-wall/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out items-center justify-center"
                        onClick={() => setExpandedImage(null)}
                    >
                        <motion.img
                            layoutId="expanded-image"
                            src={expandedImage}
                            className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                            alt="Zoom"
                        />
                        <button
                            className="absolute top-6 right-6 text-ink-warm hover:text-cuivre transition-colors"
                            onClick={() => setExpandedImage(null)}
                        >
                            <span className="font-sans text-[12px] uppercase tracking-widest border border-current px-4 py-2 rounded-full">Fermer</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

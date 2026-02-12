"use client";

import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "../../lib/utils";

import Image from "next/image";

export default function CarouselStories({ className, onExpand }: { className?: string; onExpand?: (src: string) => void }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        containScroll: "trimSnaps",
        dragFree: false,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    const onSelect = React.useCallback((api: any) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    React.useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    const slides = [
        "/Oeuvre6_1.png",
        "/Oeuvre6_2.png",
        "/Oeuvre6_3.png",
        "/Oeuvre6_4.png",
        "/Oeuvre6_5.png",
        "/Oeuvre6_6.png",
    ];

    return (
        <div className={cn("relative", className)}> {/* Uses external class for size consistency */}

            {/* Viewport/Frame - CLEAN LOOK */}
            <div
                ref={emblaRef}
                className="w-full h-full overflow-hidden bg-transparent border-0 ring-0 outline-none cursor-pointer"
                onClick={scrollNext}
            >
                <div className="flex w-full h-full touch-pan-y">
                    {slides.map((src, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_100%] min-w-0 relative flex items-center justify-center h-full"
                        >
                            <Image
                                src={src}
                                alt={`Story ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 560px"
                                className="object-contain block"
                                priority={index < 2}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-anthracite hover:text-cuivre transition-colors focus:outline-none disabled:opacity-0 disabled:pointer-events-none"
                onClick={scrollPrev}
                disabled={selectedIndex === 0}
                aria-label="Story précédente"
            >
                <ChevronLeft className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" strokeWidth={1.5} />
            </button>

            <button
                className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-anthracite hover:text-cuivre transition-colors focus:outline-none disabled:opacity-0 disabled:pointer-events-none"
                onClick={scrollNext}
                disabled={selectedIndex === slides.length - 1}
                aria-label="Story suivante"
            >
                <ChevronRight className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" strokeWidth={1.5} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 border border-white/20 shadow-sm ${i === selectedIndex ? "bg-cuivre w-3" : "bg-white/50 hover:bg-white"
                            }`}
                        onClick={() => emblaApi && emblaApi.scrollTo(i)}
                        aria-label={`Aller au slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Label & Link */}
            <div className="absolute -bottom-10 w-full flex justify-between px-0">
                <span className="font-sans text-[10px] text-ink-2 uppercase tracking-wide">
                    SÉRIE 0{selectedIndex + 1}/06
                </span>
                <a href="#catalogue" className="font-sans text-[12px] text-ink-2 hover:text-cuivre hover:underline transition-colors">
                    Voir catalogue →
                </a>
            </div>
        </div>
    );
}

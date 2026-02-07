import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const crimsonText = Crimson_Text({
    weight: ["400", "600"],
    subsets: ["latin"],
    variable: "--font-crimson-text",
    display: "swap",
});

export const metadata: Metadata = {
    title: 'Musée Digital — Portfolio',
    description: 'Jérémy Van Diest — Direction artistique digitale, community management & production de contenus pour marques premium. Portfolio interactif & candidature critique.',
    openGraph: {
        title: 'Musée Digital — Portfolio',
        description: 'Direction artistique digitale, community management & production de contenus pour marques premium.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className={`${inter.variable} ${crimsonText.variable}`}>
            <body className="antialiased bg-wall text-ink-warm">
                <SmoothScroll />
                {children}
            </body>
        </html>
    );
}

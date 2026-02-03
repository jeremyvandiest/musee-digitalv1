
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                cuivre: "#B87333",
                "cuivre-soft": "rgba(184,115,51,0.12)",
                anthracite: "#2B2B2B",
                "ink-warm": "#2A2724",
                "ink-2": "#4A4A4A",
                wall: "#EFE9DE",
                beige: "#F5F1E8",
                "blanc-casse": "#FAFAF8",
                "paper-warm": "#F0EBDD",
                line: "rgba(43,43,43,0.18)",
                "line-soft": "rgba(43,43,43,0.12)",
            },
            fontFamily: {
                serif: ["var(--font-crimson-text)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
            animation: {
                scan: "scan 16s linear infinite",
            },
            keyframes: {
                scan: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100vh)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;

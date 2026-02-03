import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, choice, source, createdAt } = body;

        // Validation basique
        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { success: false, message: "Email invalide" },
                { status: 400 }
            );
        }

        if (!choice || !["A", "B", "C"].includes(choice)) {
            return NextResponse.json(
                { success: false, message: "Choix invalide" },
                { status: 400 }
            );
        }

        // Simulation d'un délai réseau/traitement
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Ici on pourrait sauvegarder en DB
        console.log("Participation archived:", { email, choice, source, createdAt });

        return NextResponse.json({
            success: true,
            message: "Participation enregistrée",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Erreur serveur" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Incoming request to proxy:", body);
        const { email, choice, timestamp, project, action, protocol } = body;

        // Validation basique
        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { success: false, message: "Email invalide" },
                { status: 400 }
            );
        }
        // Forward to Make.com ONLY for EXECUTE action
        if (action === "EXECUTE") {
            const payload = {
                email,
                choice,
                protocol,
                timestamp,
                project,
                action
            };
            console.log(`Forwarding to Make.com:`, payload);

            const makeResponse = await fetch("https://hook.eu2.make.com/7r3i71731rst6u6hosdmdlqji15ymxon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            console.log("Make.com response status:", makeResponse.status);

            if (!makeResponse.ok) {
                const errorText = await makeResponse.text();
                console.error(`Make.com Error Message: ${errorText}`);
                throw new Error(`Make.com response not ok: ${makeResponse.status} - ${errorText}`);
            }
        } else {
            console.log(`Local success for ${action} (not forwarded to Make.com)`);
        }

        return NextResponse.json({
            success: true,
            message: action === "EXECUTE"
                ? "Participation enregistrée via Make.com"
                : "Système débloqué localement",
        });
    } catch (error: any) {
        console.error("API Route Error:", error.message || error);
        return NextResponse.json(
            { success: false, message: error.message || "Erreur serveur lors de la transmission" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the bleeding-edge Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// This defines the "Permanent Agency Brain" for the server
const OS_MANDATE = `
You are the Juggernaut Agency OS Comm-Link. 
You act as the elite UK Agency Sales Director.
NEVER sound like a generic AI. Use a confident, professional, and value-driven tone.

Your strict 'Growth Phase' pricing laws:
- Projects range from £850 to £2,500 based on scale and enterprise features.
- Monthly maintenance retainers range from £50 to £80/month.
- Never negotiate by arbitrarily dropping the price. If the client budget is too low, cut features (e.g. lower the scale from a £2,500 full application down to a £850 high-converting landing page). Prove how your speed and architecture guarantees a return on investment at these incredibly competitive early-stage rates.

When given a client email, write the exact response the executive should send back to close the deal or hold frame on price. Be brief, concise, and professional.
`;

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    // Dynamically inject the Supabase UI context into the system instructions
    const dynamicSystemContext = `
      ${OS_MANDATE}
      
      ACTIVE TARGET DOSSIER:
      Name: ${context.name}
      Current Stated Budget: ${context.budget}
      Target Pipeline Build: ${context.project}
    `;

    // Fire generation to Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: dynamicSystemContext,
        temperature: 0.2, // Low temperature for calculated, lethal sales logic
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error("Comm-Link Failure:", error);
    return NextResponse.json(
      { error: "Neural link severed. Check your GEMINI_API_KEY in .env.local." },
      { status: 500 }
    );
  }
}

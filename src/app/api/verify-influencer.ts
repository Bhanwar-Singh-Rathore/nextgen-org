import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function POST(req: Request) {
    try {
      const { claim } = await req.json();
  
      if (!claim) {
        return NextResponse.json({ error: "Claim is required" }, { status: 400 });
      }
  
      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: `Extract key health claims from: ${claim}` }],
      });
  
      const extractedClaim = aiResponse.choices[0]?.message?.content || claim;
  
      const verificationResults = await fetch(`https://www.perplexity.ai/api/search`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: extractedClaim }),
      }).then((res) => res.json());
  
      return NextResponse.json({
        verification: verificationResults.summary || "No verification found",
        sources: verificationResults.sources || [],
      });
  
    } catch (error) {
      console.error("Error processing claim:", error);
      return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }
  }
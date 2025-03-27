"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function VerifyInfluencer() {
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/verify-influencer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim }),
      });
  
      const text = await response.text();  // Get response as text first
      console.log("API response:", text);  // Log the raw response
  
      const data = JSON.parse(text);  // Parse it only if it's valid JSON
      setResult(data);
    } catch (error) {
      console.error("Error verifying claim:", error);
    }
    setLoading(false);
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-96 p-6 shadow-md">
        <div>
          <h2 className="text-xl font-bold mb-4">Verify Health Claim</h2>
          <input
            type="text"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Enter health claim or post URL"
            className="mb-4"
          />
          <button onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>

          {result && (
            <div className="mt-4">
              <h3 className="font-bold">Results:</h3>
              <p>{result.verification}</p>
              {result.sources && (
                <ul className="mt-2 list-disc pl-4">
                  {result.sources.map((src, index) => (
                    <li key={index}>
                      <a href={src} target="_blank" className="text-blue-500">
                        {src}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

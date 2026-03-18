export async function POST(request) {
  try {
    const body = await request.json();
    const { playerCount, setting, tone, difficulty, genderCounts } = body;

    // Build gender distribution instruction
    let genderInstruction = "";
    if (genderCounts) {
      const parts = [];
      if (genderCounts.female > 0)
        parts.push(`${genderCounts.female} female (she/her)`);
      if (genderCounts.male > 0)
        parts.push(`${genderCounts.male} male (he/him)`);
      if (genderCounts.neutral > 0)
        parts.push(`${genderCounts.neutral} gender-neutral (they/them)`);
      genderInstruction = `\nGENDER DISTRIBUTION (mandatory): ${parts.join(", ")}. Use correct pronouns consistently everywhere.`;
    }

    const toneGuide =
      tone === "Funny"
        ? "Lean into humor — quirky motivations, absurd alibis, darkly comedic murder."
        : tone === "Chaotic"
          ? "Make it wild — overlapping secrets, surprising twists, unreliable characters."
          : "Play it straight — genuine tension, real emotional stakes, characters with depth.";

    const difficultyGuide =
      difficulty === "Easy"
        ? "Straightforward clue trail. Killer identifiable with careful attention."
        : difficulty === "Messy"
          ? "Genuinely hard. Multiple characters look equally guilty until the end. Extremely convincing red herrings."
          : "Balanced — satisfying answer that requires real deduction.";

    const prompt = `Create a murder mystery party game.

Players: ${playerCount} | Setting: ${setting} | Tone: ${tone} | Difficulty: ${difficulty}${genderInstruction}

Requirements:
- TITLE: Catchy, evocative, hints at setting/mood
- PREMISE: 2-3 vivid paragraphs. Set the scene, the gathering, the murder discovery. No clichés.
- VICTIM: Name, rich background, clear reasons they'd have enemies
- CHARACTERS: Exactly ${playerCount} characters. Each needs: name, role, vivid personality (show how they behave, not just adjectives), a genuinely damning secret, layered relationship to victim. Exactly ONE is the murderer.
- MURDERER'S MOTIVE: Specific, compelling, inevitable in hindsight but not obvious
- TIMELINE: 4-6 chronological events with specific times leading to the murder
- CLUES: 6-10 pieces of evidence. Early clues cast wide suspicion, middle clues narrow the field, late clues clinch it. Include 2-3 convincing red herrings. Each clue has a title, description, and significance (GM-only).
- SOLUTION: 2 paragraphs explaining who, how, why, and how clues prove it

Tone: ${toneGuide}
Difficulty: ${difficultyGuide}

Respond with ONLY valid JSON matching this exact structure (no markdown, no code fences):
{
  "title": "string",
  "premise": "string",
  "victim": { "name": "string", "background": "string", "reasonKilled": "string" },
  "characters": [{ "name": "string", "role": "string", "personality": "string", "secret": "string", "relationshipToVictim": "string", "isMurderer": false }],
  "murdererMotive": "string",
  "timeline": [{ "time": "string", "event": "string" }],
  "clues": [{ "title": "string", "description": "string", "significance": "string" }],
  "solution": "string"
}`;

    const systemMessage =
      "You are a bestselling mystery novelist who designs immersive murder mystery party games. Your writing is vivid, specific, and engaging. You create characters that feel real with genuine conflicts, and mysteries where every clue fits together. You always assign exactly one character as the murderer (isMurderer: true), all others false. You ALWAYS respond with valid JSON only — no markdown fences, no extra text.";

    // Try Gemini 2.5 Flash first (fastest), fall back to GPT-4 if it fails
    const endpoints = [
      "/integrations/google-gemini-2-5-flash",
      "/integrations/chat-gpt/conversationgpt4",
    ];

    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const payload = {
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: prompt },
          ],
          stream: false,
        };

        // Add json_schema for OpenAI endpoints (structured output support)
        if (endpoint.includes("chat-gpt")) {
          payload.json_schema = {
            name: "mystery_game",
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                premise: { type: "string" },
                victim: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    background: { type: "string" },
                    reasonKilled: { type: "string" },
                  },
                  required: ["name", "background", "reasonKilled"],
                  additionalProperties: false,
                },
                characters: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      role: { type: "string" },
                      personality: { type: "string" },
                      secret: { type: "string" },
                      relationshipToVictim: { type: "string" },
                      isMurderer: { type: "boolean" },
                    },
                    required: [
                      "name",
                      "role",
                      "personality",
                      "secret",
                      "relationshipToVictim",
                      "isMurderer",
                    ],
                    additionalProperties: false,
                  },
                },
                murdererMotive: { type: "string" },
                timeline: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      time: { type: "string" },
                      event: { type: "string" },
                    },
                    required: ["time", "event"],
                    additionalProperties: false,
                  },
                },
                clues: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      significance: { type: "string" },
                    },
                    required: ["title", "description", "significance"],
                    additionalProperties: false,
                  },
                },
                solution: { type: "string" },
              },
              required: [
                "title",
                "premise",
                "victim",
                "characters",
                "murdererMotive",
                "timeline",
                "clues",
                "solution",
              ],
              additionalProperties: false,
            },
          };
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          throw new Error(`API error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const rawContent = data.choices[0].message.content;

        // Clean the response — strip markdown fences if present
        let cleanContent = rawContent.trim();
        if (cleanContent.startsWith("```")) {
          cleanContent = cleanContent
            .replace(/^```(?:json)?\s*/, "")
            .replace(/\s*```$/, "");
        }

        const mysteryData = JSON.parse(cleanContent);

        // Validate the response has required fields
        if (
          !mysteryData.title ||
          !mysteryData.characters ||
          !mysteryData.clues
        ) {
          throw new Error("Generated mystery is missing required fields");
        }

        // Ensure exactly one murderer
        const murderers = mysteryData.characters.filter((c) => c.isMurderer);
        if (murderers.length === 0 && mysteryData.characters.length > 0) {
          // Force the last character to be the murderer as a fallback
          mysteryData.characters[mysteryData.characters.length - 1].isMurderer =
            true;
        }

        return Response.json({
          success: true,
          mystery: mysteryData,
        });
      } catch (err) {
        console.error(`Error with endpoint ${endpoint}:`, err.message);
        lastError = err;
        // Continue to next endpoint
      }
    }

    // All endpoints failed
    throw lastError || new Error("All AI endpoints failed");
  } catch (error) {
    console.error("Error generating mystery:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

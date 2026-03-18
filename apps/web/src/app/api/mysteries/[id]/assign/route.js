import sql from "@/app/api/utils/sql";

function generateToken() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 24; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { characterName, contact, contactType } = body;

    // Get the mystery data
    const mysteryRows = await sql(
      "SELECT mystery_data, config FROM mysteries WHERE id = $1",
      [id],
    );

    if (mysteryRows.length === 0) {
      return Response.json(
        { success: false, error: "Mystery not found" },
        { status: 404 },
      );
    }

    // Check if character already assigned
    const existingRows = await sql(
      "SELECT id FROM character_assignments WHERE mystery_id = $1 AND character_name = $2",
      [id, characterName],
    );

    if (existingRows.length > 0) {
      return Response.json(
        { success: false, error: "This character has already been assigned" },
        { status: 400 },
      );
    }

    const mysteryData = mysteryRows[0].mystery_data;
    const config = mysteryRows[0].config;
    const character = mysteryData.characters.find(
      (c) => c.name === characterName,
    );

    if (!character) {
      return Response.json(
        { success: false, error: "Character not found" },
        { status: 404 },
      );
    }

    // Get existing assignments to see what secrets other players already have
    const existingAssignments = await sql(
      "SELECT character_name, secret_clues FROM character_assignments WHERE mystery_id = $1",
      [id],
    );

    const existingSecretsContext =
      existingAssignments.length > 0
        ? `\n\nOther players already have these secrets (make sure ${character.name}'s secrets are DIFFERENT and provide a UNIQUE perspective):\n` +
          existingAssignments
            .map((a) => {
              const secrets = a.secret_clues || [];
              return `${a.character_name}: ${secrets.map((s) => `Clue ${s.clueIndex}: "${s.secretInfo}"`).join("; ")}`;
            })
            .join("\n")
        : "";

    // Build clue list
    const cluesList = mysteryData.clues
      .map((c, i) => `Clue ${i + 1}: "${c.title}" - ${c.description}`)
      .join("\n");
    const charactersList = mysteryData.characters
      .map((c) => `${c.name} (${c.role}) - Secret: ${c.secret}`)
      .join("\n");

    const difficulty = config.difficulty || "Medium";
    const tone = config.tone || "Dramatic";

    // Determine how direct the secrets should be based on difficulty
    let difficultyGuidance = "";
    if (difficulty === "Easy") {
      difficultyGuidance = `DIFFICULTY: EASY
- About 40% of this character's secrets should contain information that clearly connects to the solution
- Red herrings should be relatively easy to dismiss with a bit of thought
- Players should feel like they're making steady progress toward the truth
- Secrets can be more direct about what the character saw or knows`;
    } else if (difficulty === "Medium") {
      difficultyGuidance = `DIFFICULTY: MEDIUM
- About 25% of this character's secrets should contain information that helps solve the mystery (but never state the answer outright)
- About 25% should be convincing red herrings that cast suspicion on innocent characters
- The remaining 50% should be character flavor, gossip, or ambiguous observations
- Players should need to compare notes with other players to connect the dots`;
    } else {
      difficultyGuidance = `DIFFICULTY: HARD (MESSY)
- No more than 15% of this character's secrets should directly help solve the mystery
- Most secrets should be ambiguous — they COULD point to the killer OR to someone innocent
- Include contradictory information, unreliable memories, and half-truths
- Players should have to carefully cross-reference multiple characters' secrets to find the truth
- Make the red herrings very convincing and the real clues subtle`;
    }

    const prompt = `You are writing personal secrets for a murder mystery party game. The tone is ${tone}.

STORY CONTEXT:
Setting: ${config.setting || "unknown"}
Victim: ${mysteryData.victim.name} — ${mysteryData.victim.background}
Why they were killed: ${mysteryData.victim.reasonKilled}
Solution: ${mysteryData.solution}
Killer's motive: ${mysteryData.murdererMotive}

ALL CHARACTERS:
${charactersList}

THE CLUES (revealed one at a time during the game):
${cluesList}

YOU ARE WRITING FOR: ${character.name} (${character.role})
Personality: ${character.personality}
Their personal secret: ${character.secret}
Relationship to victim: ${character.relationshipToVictim}
Is the killer: ${character.isMurderer ? "YES" : "NO"}

${difficultyGuidance}

IMPORTANT RULES:
1. Generate EXACTLY ONE secret for EACH clue (${mysteryData.clues.length} total). Every clue index from 1 to ${mysteryData.clues.length} must appear exactly once.
2. Each secret is something only ${character.name} personally knows — a memory, observation, overheard conversation, or piece of evidence they noticed.
3. Write from ${character.name}'s perspective. Use natural, conversational language that fits their personality. Avoid stiff or overly formal wording.
4. NO secret should directly state who the killer is or say "X is the murderer."
${character.isMurderer ? `5. Since this character IS the killer: their secrets should include careful deflections, half-truths, and things that subtly point away from themselves. A couple secrets might hint at guilt in a way only the most observant players would notice.` : `5. Since this character is INNOCENT: their secrets should reflect their genuine (but limited) perspective. They may have seen things that look suspicious about others — sometimes correctly, sometimes not.`}
6. Each secret should feel like a real piece of a puzzle — not a direct answer, but something that becomes meaningful when combined with what other players know.
7. Keep each secret to 1-3 sentences. Make them specific and vivid, not generic.
${existingSecretsContext}`;

    const gptResponse = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are a talented mystery writer creating personal secrets for characters in a murder mystery party game. Each secret should feel natural, specific, and like a real piece of a larger puzzle. Write in a way that sounds like real people remembering real events — not like reading from a script.",
          },
          { role: "user", content: prompt },
        ],
        json_schema: {
          name: "character_secrets",
          schema: {
            type: "object",
            properties: {
              secrets: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    clueIndex: { type: "integer" },
                    secretInfo: { type: "string" },
                  },
                  required: ["clueIndex", "secretInfo"],
                  additionalProperties: false,
                },
              },
            },
            required: ["secrets"],
            additionalProperties: false,
          },
        },
      }),
    });

    if (!gptResponse.ok) {
      throw new Error(`ChatGPT error: ${gptResponse.status}`);
    }

    const gptData = await gptResponse.json();
    const secretsData = JSON.parse(gptData.choices[0].message.content);

    const token = generateToken();

    // Auto-set is_killer based on the character's isMurderer flag from the story
    const isKiller = character.isMurderer === true;

    await sql(
      "INSERT INTO character_assignments (mystery_id, character_name, contact, contact_type, token, secret_clues, is_killer) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        id,
        characterName,
        contact,
        contactType,
        token,
        JSON.stringify(secretsData.secrets),
        isKiller,
      ],
    );

    return Response.json({
      success: true,
      token,
      shareUrl: `/play/${token}`,
    });
  } catch (error) {
    console.error("Error assigning character:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// Unassign a character (DELETE)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { characterName } = body;

    if (!characterName) {
      return Response.json(
        { success: false, error: "characterName is required" },
        { status: 400 },
      );
    }

    // Check the assignment exists
    const existing = await sql(
      "SELECT id FROM character_assignments WHERE mystery_id = $1 AND character_name = $2",
      [id, characterName],
    );

    if (existing.length === 0) {
      return Response.json(
        { success: false, error: "This character is not assigned" },
        { status: 404 },
      );
    }

    // Delete the assignment
    await sql(
      "DELETE FROM character_assignments WHERE mystery_id = $1 AND character_name = $2",
      [id, characterName],
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error unassigning character:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

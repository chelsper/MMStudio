import sql from "@/app/api/utils/sql";

// Get player's game view
export async function GET(request, { params }) {
  try {
    const { token } = params;

    const rows = await sql(
      `SELECT ca.character_name, ca.secret_clues, ca.clues_revealed, ca.contact, ca.is_killer,
              m.mystery_data, m.config
       FROM character_assignments ca
       JOIN mysteries m ON m.id = ca.mystery_id
       WHERE ca.token = $1`,
      [token],
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Invalid link" },
        { status: 404 },
      );
    }

    const row = rows[0];
    const mysteryData = row.mystery_data;
    const character = mysteryData.characters.find(
      (c) => c.name === row.character_name,
    );
    const secretClues = row.secret_clues;
    const cluesRevealed = row.clues_revealed;

    // Determine if secrets use 0-based or 1-based indexing
    const hasZeroBased = secretClues.some((s) => s.clueIndex === 0);
    const indexOffset = hasZeroBased ? 0 : 1; // if 0-based, offset is 0; if 1-based, offset is 1

    // Build the clues the player can see (only revealed ones)
    const visibleClues = [];
    for (let i = 0; i < cluesRevealed; i++) {
      const clue = mysteryData.clues[i];
      const expectedIndex = i + indexOffset; // match the indexing style the AI used
      const secret = secretClues.find((s) => s.clueIndex === expectedIndex);
      visibleClues.push({
        index: i,
        title: clue.title,
        description: clue.description,
        mySecret: secret ? secret.secretInfo : null,
      });
    }

    // Get this player's vote if any
    const voteRows = await sql(
      "SELECT voted_for FROM votes WHERE mystery_id = (SELECT mystery_id FROM character_assignments WHERE token = $1) AND voter_token = $1",
      [token],
    );

    // Get voting_open status
    const votingRows = await sql(
      "SELECT voting_open FROM mysteries WHERE id = (SELECT mystery_id FROM character_assignments WHERE token = $1)",
      [token],
    );
    const votingOpen =
      votingRows.length > 0 ? votingRows[0].voting_open : false;

    return Response.json({
      success: true,
      mysteryTitle: mysteryData.title,
      premise: mysteryData.premise,
      setting: row.config.setting,
      tone: row.config.tone,
      character: {
        name: character.name,
        role: character.role,
        personality: character.personality,
        secret: character.secret,
        relationshipToVictim: character.relationshipToVictim,
      },
      isKiller: row.is_killer,
      victim: mysteryData.victim,
      timeline: mysteryData.timeline || [],
      totalClues: mysteryData.clues.length,
      cluesRevealed,
      visibleClues,
      allCharacters: mysteryData.characters.map((c) => ({
        name: c.name,
        role: c.role,
      })),
      votingOpen,
      myVote: voteRows.length > 0 ? voteRows[0].voted_for : null,
    });
  } catch (error) {
    console.error("Error fetching player data:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

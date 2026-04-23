import sql from "@/app/api/utils/sql";
import { resolveMysteryData } from "@/app/api/utils/resolveMysteryData";

// Reveal the next clue for a player
export async function POST(request, { params }) {
  try {
    const { token } = params;

    // Get current state
    const rows = await sql(
      `SELECT ca.id, ca.clues_revealed, m.mystery_data, m.config
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
    const mysteryData = resolveMysteryData(row.mystery_data, row.config);
    const totalClues = mysteryData.clues.length;
    const currentRevealed = row.clues_revealed;

    if (currentRevealed >= totalClues) {
      return Response.json(
        { success: false, error: "All clues already revealed" },
        { status: 400 },
      );
    }

    const newRevealed = currentRevealed + 1;

    await sql(
      "UPDATE character_assignments SET clues_revealed = $1 WHERE id = $2",
      [newRevealed, row.id],
    );

    return Response.json({
      success: true,
      cluesRevealed: newRevealed,
      totalClues,
    });
  } catch (error) {
    console.error("Error revealing clue:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

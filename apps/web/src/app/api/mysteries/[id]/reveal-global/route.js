import sql from "@/app/api/utils/sql";
import { resolveMysteryData } from "@/app/api/utils/resolveMysteryData";

// Reveal the next clue globally for all players
export async function POST(request, { params }) {
  try {
    const { id } = params;

    // Get current state
    const rows = await sql(
      "SELECT id, mystery_data, global_clues_revealed FROM mysteries WHERE id = $1",
      [id],
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Mystery not found" },
        { status: 404 },
      );
    }

    const row = rows[0];
    const mysteryData = resolveMysteryData(row.mystery_data, {});
    const totalClues = mysteryData.clues.length;
    const currentRevealed = row.global_clues_revealed;

    if (currentRevealed >= totalClues) {
      return Response.json(
        { success: false, error: "All clues already revealed" },
        { status: 400 },
      );
    }

    const newRevealed = currentRevealed + 1;

    // Update both the mystery AND all character assignments using a transaction
    await sql.transaction([
      sql("UPDATE mysteries SET global_clues_revealed = $1 WHERE id = $2", [
        newRevealed,
        id,
      ]),
      sql(
        "UPDATE character_assignments SET clues_revealed = $1 WHERE mystery_id = $2 AND clues_revealed < $1",
        [newRevealed, id],
      ),
    ]);

    return Response.json({
      success: true,
      globalCluesRevealed: newRevealed,
      totalClues,
    });
  } catch (error) {
    console.error("Error revealing global clue:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

import sql from "@/app/api/utils/sql";
import { resolveMysteryData } from "@/app/api/utils/resolveMysteryData";

// Get a mystery by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const rows = await sql(
      "SELECT id, mystery_data, config, created_at, global_clues_revealed, voting_open FROM mysteries WHERE id = $1",
      [id],
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Mystery not found" },
        { status: 404 },
      );
    }

    const mystery = rows[0];
    const resolvedMysteryData = resolveMysteryData(
      mystery.mystery_data,
      mystery.config,
    );

    // Also get assignments for this mystery
    const assignments = await sql(
      "SELECT id, character_name, contact, contact_type, token, clues_revealed, is_killer, created_at FROM character_assignments WHERE mystery_id = $1 ORDER BY created_at ASC",
      [id],
    );

    // Get votes
    const votes = await sql(
      `SELECT v.voter_token, v.voted_for, ca.character_name as voter_name
       FROM votes v
       LEFT JOIN character_assignments ca ON ca.token = v.voter_token AND ca.mystery_id = v.mystery_id
       WHERE v.mystery_id = $1
       ORDER BY v.created_at ASC`,
      [id],
    );

    const voteCounts = {};
    for (const vote of votes) {
      if (!voteCounts[vote.voted_for]) voteCounts[vote.voted_for] = 0;
      voteCounts[vote.voted_for]++;
    }

    return Response.json({
      success: true,
      mystery: {
        id: mystery.id,
        data: resolvedMysteryData,
        config: mystery.config,
        createdAt: mystery.created_at,
        globalCluesRevealed: mystery.global_clues_revealed || 0,
        votingOpen: mystery.voting_open || false,
      },
      assignments,
      voting: {
        open: mystery.voting_open || false,
        votes,
        voteCounts,
        totalVotes: votes.length,
      },
    });
  } catch (error) {
    console.error("Error fetching mystery:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, includeBonusCharacter } = body;

    const rows = await sql(
      "SELECT config, global_clues_revealed, voting_open FROM mysteries WHERE id = $1",
      [id],
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Mystery not found" },
        { status: 404 },
      );
    }

    const mystery = rows[0];
    const currentConfig = mystery.config || {};

    if (action !== "toggleBonusCharacter") {
      return Response.json(
        { success: false, error: "Unknown action" },
        { status: 400 },
      );
    }

    if (!currentConfig.supportsOptionalCharacter) {
      return Response.json(
        {
          success: false,
          error: "This mystery does not support an optional bonus character",
        },
        { status: 400 },
      );
    }

    const assignmentRows = await sql(
      "SELECT COUNT(*)::int AS total FROM character_assignments WHERE mystery_id = $1",
      [id],
    );

    if (
      assignmentRows[0].total > 0 ||
      mystery.global_clues_revealed > 0 ||
      mystery.voting_open
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Toggle the optional character before assigning players or revealing clues",
        },
        { status: 400 },
      );
    }

    const nextConfig = {
      ...currentConfig,
      includeBonusCharacter: Boolean(includeBonusCharacter),
      playerCount: includeBonusCharacter ? 11 : 10,
    };

    await sql("UPDATE mysteries SET config = $2 WHERE id = $1", [
      id,
      JSON.stringify(nextConfig),
    ]);

    return Response.json({ success: true, config: nextConfig });
  } catch (error) {
    console.error("Error updating mystery:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

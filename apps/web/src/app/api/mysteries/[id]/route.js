import sql from "@/app/api/utils/sql";

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
        data: mystery.mystery_data,
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

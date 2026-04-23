import sql from "@/app/api/utils/sql";
import { resolveMysteryData } from "@/app/api/utils/resolveMysteryData";

// Toggle voting open/closed
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { open } = body;

    const rows = await sql(
      "UPDATE mysteries SET voting_open = $1 WHERE id = $2 RETURNING voting_open",
      [!!open, id],
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Mystery not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, votingOpen: rows[0].voting_open });
  } catch (error) {
    console.error("Error toggling voting:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// Get voting results (for GM)
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const mysteryRows = await sql(
      "SELECT voting_open, mystery_data, config FROM mysteries WHERE id = $1",
      [id],
    );

    if (mysteryRows.length === 0) {
      return Response.json(
        { success: false, error: "Mystery not found" },
        { status: 404 },
      );
    }

    const votes = await sql(
      `SELECT v.voter_token, v.voted_for, ca.character_name as voter_name
       FROM votes v
       LEFT JOIN character_assignments ca ON ca.token = v.voter_token AND ca.mystery_id = v.mystery_id
       WHERE v.mystery_id = $1
       ORDER BY v.created_at ASC`,
      [id],
    );

    // Count votes per character
    const voteCounts = {};
    for (const vote of votes) {
      if (!voteCounts[vote.voted_for]) {
        voteCounts[vote.voted_for] = 0;
      }
      voteCounts[vote.voted_for]++;
    }

    const mysteryData = resolveMysteryData(
      mysteryRows[0].mystery_data,
      mysteryRows[0].config,
    );

    return Response.json({
      success: true,
      votingOpen: mysteryRows[0].voting_open,
      accusationTargets: (
        mysteryData.accusationTargets || mysteryData.characters
      ).map((character) => ({
        name: character.name,
        role: character.role,
        isMurderer: character.isMurderer === true,
      })),
      votes,
      voteCounts,
      totalVotes: votes.length,
    });
  } catch (error) {
    console.error("Error getting votes:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

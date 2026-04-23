import sql from "@/app/api/utils/sql";
import { resolveMysteryData } from "@/app/api/utils/resolveMysteryData";

// Cast a vote
export async function POST(request, { params }) {
  try {
    const { token } = params;
    const body = await request.json();
    const { votedFor } = body;

    if (!votedFor) {
      return Response.json(
        { success: false, error: "Must specify who to vote for" },
        { status: 400 },
      );
    }

    // Get assignment and check mystery has voting open
    const rows = await sql(
      `SELECT ca.mystery_id, ca.character_name, m.voting_open, m.mystery_data, m.config
       FROM character_assignments ca
       JOIN mysteries m ON m.id = ca.mystery_id
       WHERE ca.token = $1`,
      [token],
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Invalid token" },
        { status: 404 },
      );
    }

    const row = rows[0];

    if (!row.voting_open) {
      return Response.json(
        { success: false, error: "Voting is not open yet" },
        { status: 400 },
      );
    }

    const mysteryData = resolveMysteryData(row.mystery_data, row.config);
    const validCharacter = (
      mysteryData.accusationTargets || mysteryData.characters
    ).some(
      (c) => c.name === votedFor,
    );
    if (!validCharacter) {
      return Response.json(
        { success: false, error: "Invalid character name" },
        { status: 400 },
      );
    }

    // Upsert the vote (one vote per player)
    await sql(
      `INSERT INTO votes (mystery_id, voter_token, voted_for)
       VALUES ($1, $2, $3)
       ON CONFLICT (mystery_id, voter_token) DO UPDATE SET voted_for = $3`,
      [row.mystery_id, token, votedFor],
    );

    return Response.json({ success: true, votedFor });
  } catch (error) {
    console.error("Error casting vote:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// Get current vote status for this player
export async function GET(request, { params }) {
  try {
    const { token } = params;

    const rows = await sql(
      `SELECT ca.mystery_id, m.voting_open, m.mystery_data, m.config
       FROM character_assignments ca
       JOIN mysteries m ON m.id = ca.mystery_id
       WHERE ca.token = $1`,
      [token],
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Invalid token" },
        { status: 404 },
      );
    }

    const row = rows[0];

    // Get this player's vote if any
    const voteRows = await sql(
      "SELECT voted_for FROM votes WHERE mystery_id = $1 AND voter_token = $2",
      [row.mystery_id, token],
    );

    const mysteryData = resolveMysteryData(row.mystery_data, row.config);

    return Response.json({
      success: true,
      votingOpen: row.voting_open,
      myVote: voteRows.length > 0 ? voteRows[0].voted_for : null,
      characters: (
        mysteryData.accusationTargets || mysteryData.characters
      ).map((c) => ({
        name: c.name,
        role: c.role,
      })),
    });
  } catch (error) {
    console.error("Error getting vote status:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

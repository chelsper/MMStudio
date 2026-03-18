import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

async function checkAdmin() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const rows = await sql("SELECT is_admin FROM auth_users WHERE id = $1", [
    session.user.id,
  ]);
  if (!rows.length || !rows[0].is_admin) return null;
  return session.user;
}

// GET /api/admin/mysteries — list all mysteries
export async function GET(request) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = 25;
    const offset = (page - 1) * limit;

    const mysteries = await sql(
      `SELECT m.id, m.config, m.created_at, m.voting_open, m.global_clues_revealed, m.user_email,
        (SELECT COUNT(*)::int FROM character_assignments WHERE mystery_id = m.id) as player_count
       FROM mysteries m
       ORDER BY m.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const countResult = await sql(
      "SELECT COUNT(*)::int as total FROM mysteries",
    );

    return Response.json({
      mysteries,
      total: countResult[0].total,
      page,
      totalPages: Math.ceil(countResult[0].total / limit),
    });
  } catch (error) {
    console.error("Admin mysteries error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/admin/mysteries — delete a mystery
export async function POST(request) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { action, mysteryId } = body;

    if (action === "delete") {
      await sql("DELETE FROM votes WHERE mystery_id = $1", [mysteryId]);
      await sql("DELETE FROM character_assignments WHERE mystery_id = $1", [
        mysteryId,
      ]);
      await sql("DELETE FROM mysteries WHERE id = $1", [mysteryId]);
      return Response.json({ success: true });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Admin mystery action error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

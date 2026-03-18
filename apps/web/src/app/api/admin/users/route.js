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

// GET /api/admin/users — list all users with purchase info
export async function GET(request) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = 25;
    const offset = (page - 1) * limit;

    let queryStr = "";
    let countStr = "";
    const params = [];

    if (search) {
      queryStr = `SELECT u.id, u.name, u.email, u."emailVerified", u.is_admin, u.stripe_id, u.image,
        (SELECT COUNT(*)::int FROM purchases WHERE user_id = u.id) as purchase_count,
        (SELECT COUNT(*)::int FROM mysteries WHERE user_email = u.email) as mystery_count
        FROM auth_users u
        WHERE LOWER(u.email) LIKE LOWER($1) OR LOWER(u.name) LIKE LOWER($1)
        ORDER BY u.id DESC LIMIT $2 OFFSET $3`;
      countStr = `SELECT COUNT(*)::int as total FROM auth_users WHERE LOWER(email) LIKE LOWER($1) OR LOWER(name) LIKE LOWER($1)`;
      params.push("%" + search + "%", limit, offset);
    } else {
      queryStr = `SELECT u.id, u.name, u.email, u."emailVerified", u.is_admin, u.stripe_id, u.image,
        (SELECT COUNT(*)::int FROM purchases WHERE user_id = u.id) as purchase_count,
        (SELECT COUNT(*)::int FROM mysteries WHERE user_email = u.email) as mystery_count
        FROM auth_users u
        ORDER BY u.id DESC LIMIT $1 OFFSET $2`;
      countStr = `SELECT COUNT(*)::int as total FROM auth_users`;
      params.push(limit, offset);
    }

    const users = await sql(queryStr, params);
    const countParams = search ? ["%" + search + "%"] : [];
    const countResult = await sql(countStr, countParams);

    return Response.json({
      users,
      total: countResult[0].total,
      page,
      totalPages: Math.ceil(countResult[0].total / limit),
    });
  } catch (error) {
    console.error("Admin users error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/admin/users — update a user (toggle admin, delete, grant credits)
export async function POST(request) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { action, userId, email } = body;

    if (action === "toggle_admin") {
      await sql("UPDATE auth_users SET is_admin = NOT is_admin WHERE id = $1", [
        userId,
      ]);
      return Response.json({ success: true });
    }

    if (action === "delete_user") {
      // Delete associated data
      await sql("DELETE FROM purchases WHERE user_id = $1", [userId]);
      await sql('DELETE FROM auth_sessions WHERE "userId" = $1', [userId]);
      await sql('DELETE FROM auth_accounts WHERE "userId" = $1', [userId]);
      await sql("DELETE FROM auth_users WHERE id = $1", [userId]);
      return Response.json({ success: true });
    }

    if (action === "grant_game") {
      const targetEmail = email;
      await sql(
        `INSERT INTO purchases (user_id, user_email, payment_type, amount_cents, games_allowed, games_used, is_active)
         VALUES ($1, $2, 'one_time', 0, 1, 0, true)`,
        [userId, targetEmail],
      );
      return Response.json({ success: true });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Admin user action error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

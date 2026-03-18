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

// GET /api/admin/coupons — list coupons
export async function GET() {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const coupons = await sql("SELECT * FROM coupons ORDER BY created_at DESC");
    return Response.json({ coupons });
  } catch (error) {
    console.error("Admin coupons error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/admin/coupons — create or update a coupon
export async function POST(request) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { action } = body;

    if (action === "create") {
      const { code, discount_type, discount_value, max_uses, valid_until } =
        body;
      if (!code || !discount_type || discount_value === undefined) {
        return Response.json(
          { error: "Missing required fields" },
          { status: 400 },
        );
      }

      await sql(
        `INSERT INTO coupons (code, discount_type, discount_value, max_uses, valid_until)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          code.toUpperCase().trim(),
          discount_type,
          discount_value,
          max_uses || null,
          valid_until || null,
        ],
      );
      return Response.json({ success: true });
    }

    if (action === "toggle") {
      const { couponId } = body;
      await sql("UPDATE coupons SET is_active = NOT is_active WHERE id = $1", [
        couponId,
      ]);
      return Response.json({ success: true });
    }

    if (action === "delete") {
      const { couponId } = body;
      await sql("DELETE FROM coupons WHERE id = $1", [couponId]);
      return Response.json({ success: true });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Admin coupons action error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

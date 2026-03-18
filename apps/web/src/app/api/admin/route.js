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

// GET /api/admin — dashboard stats
export async function GET() {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const usersCount = await sql(
      "SELECT COUNT(*)::int as total FROM auth_users",
    );
    const mysteriesCount = await sql(
      "SELECT COUNT(*)::int as total FROM mysteries",
    );
    const purchasesCount = await sql(
      "SELECT COUNT(*)::int as total FROM purchases",
    );
    const activeSubs = await sql(
      "SELECT COUNT(*)::int as total FROM purchases WHERE payment_type = 'subscription' AND is_active = true AND expires_at > NOW()",
    );
    const revenue = await sql(
      "SELECT COALESCE(SUM(amount_cents), 0)::int as total FROM purchases",
    );
    const couponsCount = await sql(
      "SELECT COUNT(*)::int as total FROM coupons",
    );

    return Response.json({
      stats: {
        totalUsers: usersCount[0].total,
        totalMysteries: mysteriesCount[0].total,
        totalPurchases: purchasesCount[0].total,
        activeSubscriptions: activeSubs[0].total,
        totalRevenueCents: revenue[0].total,
        totalCoupons: couponsCount[0].total,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

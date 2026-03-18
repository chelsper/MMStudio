import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Called after a mystery is successfully generated to deduct a game credit
export const POST = async (request) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Check for active subscription first (unlimited, no deduction needed)
    const activeSubs = await sql(
      `SELECT id FROM purchases
       WHERE user_id = $1 AND payment_type = 'subscription' AND is_active = true
       AND expires_at > NOW()
       LIMIT 1`,
      [userId],
    );

    if (activeSubs.length > 0) {
      return Response.json({ success: true, plan: "subscription" });
    }

    // Deduct from one-time purchase
    const result = await sql(
      `UPDATE purchases SET games_used = games_used + 1
       WHERE id = (
         SELECT id FROM purchases
         WHERE user_id = $1 AND payment_type = 'one_time' AND is_active = true
         AND games_used < games_allowed
         ORDER BY created_at ASC LIMIT 1
       )
       RETURNING id, games_allowed, games_used`,
      [userId],
    );

    if (result.length === 0) {
      return Response.json(
        { error: "No active purchase found" },
        { status: 403 },
      );
    }

    return Response.json({
      success: true,
      plan: "one_time",
      gamesRemaining: result[0].games_allowed - result[0].games_used,
    });
  } catch (error) {
    console.error("Use game credit error:", error);
    return Response.json(
      { error: "Failed to use game credit" },
      { status: 500 },
    );
  }
};

import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";
import Stripe from "stripe";

async function getPaymentStatus(session, body) {
  const userId = session.user.id;
  const email = session.user.email;

  // If a session_id is provided, verify the payment and record it
  if (body.session_id && body.product) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Check if we already recorded this session
    const existing = await sql(
      "SELECT id FROM purchases WHERE stripe_session_id = $1",
      [body.session_id],
    );

    if (existing.length === 0) {
      try {
        const checkoutSession = await stripe.checkout.sessions.retrieve(
          body.session_id,
        );

        const isSubscription = body.product === "subscription";

        if (isSubscription) {
          // For subscription mode, check the subscription status
          const subStatus = checkoutSession.subscription;
          if (subStatus) {
            const subscription = await stripe.subscriptions.retrieve(subStatus);
            if (
              subscription.status === "active" ||
              subscription.status === "trialing"
            ) {
              const currentPeriodEnd = new Date(
                subscription.current_period_end * 1000,
              );
              await sql(
                `INSERT INTO purchases (user_id, user_email, payment_type, stripe_session_id, stripe_payment_intent, amount_cents, games_allowed, games_used, expires_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, 0, $8)`,
                [
                  userId,
                  email,
                  "subscription",
                  body.session_id,
                  subscription.id,
                  3594,
                  -1,
                  currentPeriodEnd,
                ],
              );
            }
          }
        } else {
          // One-time payment mode
          if (checkoutSession.payment_status === "paid") {
            await sql(
              `INSERT INTO purchases (user_id, user_email, payment_type, stripe_session_id, stripe_payment_intent, amount_cents, games_allowed, games_used, expires_at)
               VALUES ($1, $2, $3, $4, $5, $6, $7, 0, $8)`,
              [
                userId,
                email,
                "one_time",
                body.session_id,
                checkoutSession.payment_intent,
                1499,
                1,
                null,
              ],
            );
          }
        }
      } catch (err) {
        console.error("Error verifying Stripe session:", err);
      }
    }
  }

  // Check if user has an active subscription (not expired)
  const activeSubs = await sql(
    `SELECT id, expires_at, games_allowed, games_used, stripe_payment_intent FROM purchases
     WHERE user_id = $1 AND payment_type = 'subscription' AND is_active = true
     AND expires_at > NOW()
     ORDER BY created_at DESC LIMIT 1`,
    [userId],
  );

  if (activeSubs.length > 0) {
    // Optionally refresh expiry from Stripe for active subscriptions
    let expiresAt = activeSubs[0].expires_at;
    const stripeSubId = activeSubs[0].stripe_payment_intent;
    if (stripeSubId && stripeSubId.startsWith("sub_")) {
      try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const subscription = await stripe.subscriptions.retrieve(stripeSubId);
        if (
          subscription.status === "active" ||
          subscription.status === "trialing"
        ) {
          const newExpiry = new Date(subscription.current_period_end * 1000);
          if (newExpiry > new Date(expiresAt)) {
            await sql("UPDATE purchases SET expires_at = $1 WHERE id = $2", [
              newExpiry,
              activeSubs[0].id,
            ]);
            expiresAt = newExpiry;
          }
        } else if (
          subscription.status === "canceled" ||
          subscription.status === "unpaid"
        ) {
          await sql("UPDATE purchases SET is_active = false WHERE id = $1", [
            activeSubs[0].id,
          ]);
          // Fall through to check one-time purchases
        }
      } catch (err) {
        console.error("Error refreshing subscription status:", err);
      }
    }

    // Re-check if still active after potential deactivation
    const stillActive = await sql(
      `SELECT id, expires_at FROM purchases WHERE id = $1 AND is_active = true AND expires_at > NOW()`,
      [activeSubs[0].id],
    );
    if (stillActive.length > 0) {
      return Response.json({
        canCreate: true,
        plan: "subscription",
        expiresAt: expiresAt,
        autoRenew: true,
      });
    }
  }

  // Check if user has unused one-time purchases
  const oneTimePurchases = await sql(
    `SELECT id, games_allowed, games_used FROM purchases
     WHERE user_id = $1 AND payment_type = 'one_time' AND is_active = true
     AND games_used < games_allowed
     ORDER BY created_at ASC LIMIT 1`,
    [userId],
  );

  if (oneTimePurchases.length > 0) {
    const purchase = oneTimePurchases[0];
    return Response.json({
      canCreate: true,
      plan: "one_time",
      gamesRemaining: purchase.games_allowed - purchase.games_used,
    });
  }

  return Response.json({
    canCreate: false,
    reason: "no_active_purchase",
  });
}

export const GET = async (request) => {
  try {
    const session = await auth();
    if (!session?.user?.email || !session?.user?.id) {
      return Response.json(
        { canCreate: false, reason: "not_authenticated" },
        { status: 200 },
      );
    }
    return getPaymentStatus(session, {});
  } catch (error) {
    console.error("Payment status error:", error);
    return Response.json(
      { canCreate: false, reason: "error" },
      { status: 500 },
    );
  }
};

export const POST = async (request) => {
  try {
    const session = await auth();

    if (!session?.user?.email || !session?.user?.id) {
      return Response.json(
        { canCreate: false, reason: "not_authenticated" },
        { status: 200 },
      );
    }

    let body = {};
    try {
      const text = await request.text();
      if (text) {
        body = JSON.parse(text);
      }
    } catch {
      // no body or invalid JSON, that's fine
    }

    return getPaymentStatus(session, body);
  } catch (error) {
    console.error("Payment status error:", error);
    return Response.json(
      { canCreate: false, reason: "error" },
      { status: 500 },
    );
  }
};

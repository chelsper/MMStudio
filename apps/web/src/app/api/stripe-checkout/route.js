import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";
import Stripe from "stripe";

const PRODUCTS = {
  one_time: {
    mode: "payment",
    price_data: {
      currency: "usd",
      product_data: { name: "Single Mystery Game" },
      unit_amount: 1499, // $14.99
    },
    games_allowed: 1,
    amount_cents: 1499,
  },
  subscription: {
    mode: "subscription",
    price_data: {
      currency: "usd",
      product_data: {
        name: "Mystery Creator Pass — 6 Months Unlimited",
        description:
          "Create unlimited mystery games. $5.99/mo billed every 6 months. Auto-renews.",
      },
      recurring: { interval: "month", interval_count: 6 },
      unit_amount: 3594, // $35.94 ($5.99 × 6)
    },
    games_allowed: -1, // unlimited
    amount_cents: 3594,
  },
};

export const POST = async (request) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await auth();

    if (!session?.user?.email || !session?.user?.id) {
      return Response.json(
        { error: "You must be signed in to purchase" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { product, redirectURL, coupon_code } = body;

    if (!product || !PRODUCTS[product]) {
      return Response.json({ error: "Invalid product" }, { status: 400 });
    }

    const productInfo = PRODUCTS[product];
    const email = session.user.email;
    const userId = session.user.id;

    // Validate coupon if provided
    let coupon = null;
    let discountAmountCents = 0;
    let finalAmountCents = productInfo.amount_cents;

    if (coupon_code) {
      const coupons = await sql(
        "SELECT * FROM coupons WHERE UPPER(code) = UPPER($1) AND is_active = true",
        [coupon_code.trim()],
      );

      if (!coupons.length) {
        return Response.json({ error: "Invalid coupon code" }, { status: 400 });
      }

      coupon = coupons[0];

      // Check expiration
      if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
        return Response.json(
          { error: "This coupon has expired" },
          { status: 400 },
        );
      }

      // Check usage limit
      if (coupon.max_uses !== null && coupon.times_used >= coupon.max_uses) {
        return Response.json(
          { error: "This coupon has reached its usage limit" },
          { status: 400 },
        );
      }

      // Calculate discount
      if (coupon.discount_type === "percent") {
        discountAmountCents = Math.round(
          productInfo.amount_cents * (coupon.discount_value / 100),
        );
      } else if (coupon.discount_type === "fixed") {
        discountAmountCents = coupon.discount_value * 100;
      } else if (coupon.discount_type === "free_game") {
        // free_game makes any product free
        discountAmountCents = productInfo.amount_cents;
      }

      finalAmountCents = Math.max(
        0,
        productInfo.amount_cents - discountAmountCents,
      );
    }

    // If coupon makes it completely free, skip Stripe and create purchase directly
    if (coupon && finalAmountCents === 0) {
      // Increment coupon usage
      await sql(
        "UPDATE coupons SET times_used = times_used + 1 WHERE id = $1",
        [coupon.id],
      );

      if (product === "subscription") {
        // Free subscription: grant 6 months unlimited
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 6);

        await sql(
          `INSERT INTO purchases (user_id, user_email, payment_type, amount_cents, games_allowed, is_active, expires_at)
           VALUES ($1, $2, 'subscription', 0, -1, true, $3)`,
          [userId, email, expiresAt],
        );

        return Response.json({
          free: true,
          plan: "subscription",
          message: "Coupon applied! Your Creator Pass is active.",
        });
      } else {
        // Free one-time game credit
        await sql(
          `INSERT INTO purchases (user_id, user_email, payment_type, amount_cents, games_allowed, is_active)
           VALUES ($1, $2, 'one_time', 0, 1, true)`,
          [userId, email],
        );

        return Response.json({
          free: true,
          plan: "one_time",
          message: "Coupon applied! Your free game is ready.",
        });
      }
    }

    // Get or create Stripe customer
    const users = await sql("SELECT stripe_id FROM auth_users WHERE id = $1", [
      userId,
    ]);
    let stripeCustomerId = users[0]?.stripe_id;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email });
      stripeCustomerId = customer.id;
      await sql("UPDATE auth_users SET stripe_id = $1 WHERE id = $2", [
        stripeCustomerId,
        userId,
      ]);
    }

    // Build price data with possible discount
    const priceData = { ...productInfo.price_data };
    if (coupon && discountAmountCents > 0) {
      priceData.unit_amount = finalAmountCents;
      const discountDesc =
        coupon.discount_type === "percent"
          ? `${coupon.discount_value}% off with code ${coupon.code}`
          : `$${(discountAmountCents / 100).toFixed(2)} off with code ${coupon.code}`;
      priceData.product_data = {
        ...priceData.product_data,
        name: `${priceData.product_data.name} (${discountDesc})`,
      };
    }

    const sessionParams = {
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: productInfo.mode,
      success_url: `${redirectURL}?session_id={CHECKOUT_SESSION_ID}&product=${product}`,
      cancel_url: redirectURL,
      metadata: {
        product,
        user_id: userId,
        user_email: email,
        coupon_id: coupon ? String(coupon.id) : "",
        coupon_code: coupon ? coupon.code : "",
      },
    };

    // For subscriptions, allow cancellation from Stripe portal
    if (product === "subscription") {
      sessionParams.subscription_data = {
        metadata: {
          product,
          user_id: userId,
          user_email: email,
        },
      };
    }

    // Increment coupon usage when starting checkout
    if (coupon) {
      await sql(
        "UPDATE coupons SET times_used = times_used + 1 WHERE id = $1",
        [coupon.id],
      );
    }

    const checkoutSession =
      await stripe.checkout.sessions.create(sessionParams);

    return Response.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
};

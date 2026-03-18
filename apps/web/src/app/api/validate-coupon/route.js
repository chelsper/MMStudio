import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "You must be signed in" }, { status: 401 });
    }

    const body = await request.json();
    const { code, product } = body;

    if (!code || !product) {
      return Response.json(
        { error: "Coupon code and product are required" },
        { status: 400 },
      );
    }

    const coupons = await sql(
      `SELECT * FROM coupons WHERE UPPER(code) = UPPER($1) AND is_active = true`,
      [code.trim()],
    );

    if (!coupons.length) {
      return Response.json({ error: "Invalid coupon code" }, { status: 404 });
    }

    const coupon = coupons[0];

    // Check if expired
    if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
      return Response.json(
        { error: "This coupon has expired" },
        { status: 400 },
      );
    }

    // Check if not yet valid
    if (coupon.valid_from && new Date(coupon.valid_from) > new Date()) {
      return Response.json(
        { error: "This coupon is not yet valid" },
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

    // Calculate discount based on product
    const productPrices = {
      one_time: 1499, // $14.99
      subscription: 3594, // $35.94
    };

    const originalPrice = productPrices[product];
    if (!originalPrice) {
      return Response.json({ error: "Invalid product" }, { status: 400 });
    }

    let discountAmount = 0;
    let finalPrice = originalPrice;

    if (coupon.discount_type === "percent") {
      discountAmount = Math.round(
        originalPrice * (coupon.discount_value / 100),
      );
      finalPrice = originalPrice - discountAmount;
    } else if (coupon.discount_type === "fixed") {
      // discount_value is stored as a whole number (e.g., 5 = $5.00)
      discountAmount = coupon.discount_value * 100;
      finalPrice = Math.max(0, originalPrice - discountAmount);
    } else if (coupon.discount_type === "free_game") {
      // Free game coupon — applies to any product
      discountAmount = originalPrice;
      finalPrice = 0;
    }

    return Response.json({
      valid: true,
      code: coupon.code,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      discount_amount_cents: discountAmount,
      original_price_cents: originalPrice,
      final_price_cents: finalPrice,
      description: getDiscountDescription(coupon),
    });
  } catch (error) {
    console.error("Validate coupon error:", error);
    return Response.json(
      { error: "Failed to validate coupon" },
      { status: 500 },
    );
  }
}

function getDiscountDescription(coupon) {
  if (coupon.discount_type === "percent") {
    return `${coupon.discount_value}% off`;
  } else if (coupon.discount_type === "fixed") {
    return `$${coupon.discount_value} off`;
  } else if (coupon.discount_type === "free_game") {
    return "Free game";
  }
  return "";
}

"use client";

import { useState, useEffect } from "react";
import { Sparkles, Check, Crown, Zap, Loader2, Tag, X } from "lucide-react";
import useUser from "@/utils/useUser";

export default function PricingPage() {
  const { data: user, loading: userLoading } = useUser();
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [couponError, setCouponError] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Check for returning from checkout
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const product = params.get("product");
    if (sessionId && product) {
      verifyPayment(sessionId, product);
    } else {
      checkStatus();
    }
  }, [user]);

  const checkStatus = async () => {
    try {
      const res = await fetch("/api/payment-status");
      if (!res.ok) throw new Error("Failed to check status");
      const data = await res.json();
      setPaymentStatus(data);
    } catch (err) {
      console.error(err);
    } finally {
      setStatusLoading(false);
    }
  };

  const verifyPayment = async (sessionId, product) => {
    setStatusLoading(true);
    try {
      const res = await fetch("/api/payment-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, product }),
      });
      if (!res.ok) throw new Error("Failed to verify");
      const data = await res.json();
      setPaymentStatus(data);
      if (data.canCreate) {
        // Payment verified — redirect back to the generator so users can create immediately
        window.location.href = "/";
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStatusLoading(false);
    }
  };

  const validateCoupon = async () => {
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError(null);
    setCouponData(null);

    try {
      // Validate against one_time by default (broader compatibility)
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), product: "one_time" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCouponError(data.error || "Invalid coupon");
        return;
      }

      setCouponData(data);
    } catch (err) {
      console.error(err);
      setCouponError("Failed to validate coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const clearCoupon = () => {
    setCouponCode("");
    setCouponData(null);
    setCouponError(null);
  };

  const handleCheckout = async (product) => {
    if (!user) {
      window.location.href = "/account/signup?callbackUrl=/pricing";
      return;
    }

    setLoadingProduct(product);
    setError(null);

    try {
      const checkoutBody = {
        product,
        redirectURL: window.location.origin + "/pricing",
      };

      if (couponData && couponData.valid) {
        checkoutBody.coupon_code = couponData.code;
      }

      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutBody),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to create checkout");
      }

      const data = await response.json();

      // Handle free coupon (no Stripe redirect needed)
      if (data.free) {
        const newStatus =
          data.plan === "subscription"
            ? { canCreate: true, plan: "subscription" }
            : { canCreate: true, plan: "one_time", gamesRemaining: 1 };
        setPaymentStatus(newStatus);
        clearCoupon();
        // Auto-redirect back to generator after a brief moment
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
        return;
      }

      if (data.url) {
        window.open(data.url, "_blank", "popup");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoadingProduct(null);
    }
  };

  const handleCouponKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateCoupon();
    }
  };

  const hasAccess = paymentStatus?.canCreate;

  const oneTimeButtonLabel =
    loadingProduct === "one_time"
      ? null
      : user
        ? "Buy Single Game"
        : "Sign Up to Buy";

  const subButtonLabel =
    loadingProduct === "subscription"
      ? null
      : user
        ? "Get Creator Pass"
        : "Sign Up to Subscribe";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-4">
          <a href="/" className="text-purple-300 hover:text-purple-200 text-sm">
            ← Back to Generator
          </a>
        </div>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-500/20 p-4 rounded-full backdrop-blur-sm border border-purple-500/30">
              <Sparkles className="w-10 h-10 text-purple-300" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-crimson-text">
            Choose Your Plan
          </h1>
          <p className="text-xl text-purple-200">
            Start creating unforgettable mystery parties
          </p>
        </div>

        {/* Active plan banner */}
        {hasAccess && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mb-8 text-center">
            <p className="text-green-200 font-semibold">
              ✅ You have an active{" "}
              {paymentStatus.plan === "subscription"
                ? "Creator Pass"
                : `game credit (${paymentStatus.gamesRemaining} remaining)`}
              !{" "}
              <a href="/" className="underline hover:text-white">
                Go create a mystery →
              </a>
            </p>
            {paymentStatus.plan === "subscription" &&
              paymentStatus.expiresAt && (
                <p className="text-green-300/70 text-sm mt-1">
                  Expires{" "}
                  {new Date(paymentStatus.expiresAt).toLocaleDateString()}
                </p>
              )}
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-red-200 text-center">
            {error}
          </div>
        )}

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* One-time */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-pink-500/20 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-pink-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Single Game</h2>
            </div>

            <div className="mb-6">
              <span className="text-5xl font-bold text-white">$14.99</span>
              <span className="text-purple-300 ml-2">one time</span>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              <PricingFeature text="Create 1 mystery game" />
              <PricingFeature text="Full character guides" />
              <PricingFeature text="Clue management" />
              <PricingFeature text="Voting & reveals" />
              <PricingFeature text="Shareable player links" />
            </ul>

            <button
              onClick={() => handleCheckout("one_time")}
              disabled={loadingProduct === "one_time" || statusLoading}
              className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-lg text-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 flex items-center justify-center gap-2"
            >
              {loadingProduct === "one_time" ? (
                <>
                  <Loader2
                    className="w-5 h-5"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  Processing...
                </>
              ) : (
                oneTimeButtonLabel
              )}
            </button>
          </div>

          {/* Subscription */}
          <div className="bg-gradient-to-b from-purple-500/20 to-pink-500/10 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-8 flex flex-col relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-white text-sm font-bold">
              BEST VALUE
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <Crown className="w-6 h-6 text-purple-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Creator Pass</h2>
            </div>

            <div className="mb-2">
              <span className="text-5xl font-bold text-white">$5.99</span>
              <span className="text-purple-300 ml-2">/month</span>
            </div>
            <p className="text-purple-300 text-sm mb-6">
              $35.94 billed every 6 months · Auto-renews
            </p>

            <ul className="space-y-3 mb-8 flex-grow">
              <PricingFeature text="Unlimited mystery games" highlight />
              <PricingFeature text="Full character guides" />
              <PricingFeature text="Clue management" />
              <PricingFeature text="Voting & reveals" />
              <PricingFeature text="Shareable player links" />
              <PricingFeature text="Auto-renews every 6 months" highlight />
            </ul>

            <button
              onClick={() => handleCheckout("subscription")}
              disabled={loadingProduct === "subscription" || statusLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-lg text-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              {loadingProduct === "subscription" ? (
                <>
                  <Loader2
                    className="w-5 h-5"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  Processing...
                </>
              ) : (
                subButtonLabel
              )}
            </button>
          </div>
        </div>

        {/* Coupon code section */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-purple-300" />
              <span className="text-white text-sm font-semibold">
                Have a coupon code?
              </span>
            </div>

            {couponData ? (
              <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-green-200 font-semibold text-sm">
                    ✅ {couponData.code} — {couponData.description}
                  </p>
                  <p className="text-green-300/70 text-xs mt-1">
                    Discount will be applied at checkout
                  </p>
                </div>
                <button
                  onClick={clearCoupon}
                  className="text-green-300 hover:text-white p-1 ml-2 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    if (couponError) setCouponError(null);
                  }}
                  onKeyDown={handleCouponKeyDown}
                  placeholder="Enter code"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-purple-400 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
                <button
                  onClick={validateCoupon}
                  disabled={!couponCode.trim() || couponLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {couponLoading ? (
                    <Loader2
                      className="w-4 h-4"
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
            )}

            {couponError && (
              <p className="text-red-400 text-xs mt-2">{couponError}</p>
            )}
          </div>
        </div>

        {/* Refund policy */}
        <div className="mt-8 text-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-white font-semibold mb-3 text-lg">
              Refund Policy – Creator Pass
            </h3>
            <p className="text-purple-300 text-sm leading-relaxed">
              If you cancel within the first six months, your refund will be
              prorated based on usage. The value of any games created ($14.99
              per game) will be deducted from your original purchase price
              ($35.94).
            </p>
          </div>
        </div>

        {/* Sign in link if not authenticated */}
        {!userLoading && !user && (
          <div className="text-center mt-8">
            <p className="text-purple-300">
              Already have an account?{" "}
              <a
                href="/account/signin?callbackUrl=/pricing"
                className="text-purple-200 hover:text-white underline"
              >
                Sign in
              </a>
            </p>
          </div>
        )}

        {/* Signed in user nav */}
        {!userLoading && user && (
          <div className="text-center mt-8 space-x-6">
            <a
              href="/"
              className="text-purple-300 hover:text-purple-200 underline"
            >
              Back to Generator
            </a>
            <a
              href="/account/logout"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Sign out
            </a>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function PricingFeature({ text, highlight }) {
  return (
    <li className="flex items-center gap-3">
      <Check
        className={`w-5 h-5 flex-shrink-0 ${highlight ? "text-purple-400" : "text-green-400"}`}
      />
      <span
        className={`${highlight ? "text-white font-semibold" : "text-purple-200"}`}
      >
        {text}
      </span>
    </li>
  );
}

import { useState, useEffect, useCallback } from "react";
import { Plus, Loader2 } from "lucide-react";
import { CouponForm } from "./CouponForm";
import { CouponsTable } from "./CouponsTable";

export function CouponsTab() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/coupons");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setCoupons(data.coupons);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleToggle = async (id) => {
    try {
      await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle", couponId: id }),
      });
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!confirm("Delete this coupon?")) return;
    try {
      await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", couponId: id }),
      });
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Coupons</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Coupon
        </button>
      </div>

      {showForm && (
        <CouponForm
          onSuccess={() => {
            setShowForm(false);
            fetchCoupons();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
        </div>
      ) : (
        <>
          <CouponsTable
            coupons={coupons}
            onToggle={handleToggle}
            onDelete={handleDeleteCoupon}
          />
          {coupons.length === 0 && (
            <p className="text-slate-400 text-center py-8">
              No coupons yet. Create one above!
            </p>
          )}
        </>
      )}
    </div>
  );
}

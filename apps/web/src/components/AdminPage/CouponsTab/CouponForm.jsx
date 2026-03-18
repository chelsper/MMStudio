import { useState } from "react";

export function CouponForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    code: "",
    discount_type: "percent",
    discount_value: 10,
    max_uses: "",
    valid_until: "",
  });
  const [formLoading, setFormLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          ...form,
          discount_value: Number(form.discount_value),
          max_uses: form.max_uses ? Number(form.max_uses) : null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed");
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">Code</label>
          <input
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="e.g. SUMMER2026"
            required
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Type</label>
          <select
            value={form.discount_type}
            onChange={(e) =>
              setForm({ ...form, discount_type: e.target.value })
            }
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="percent">Percent off</option>
            <option value="fixed">Fixed amount off (cents)</option>
            <option value="free_game">Free game credit</option>
          </select>
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Value</label>
          <input
            type="number"
            value={form.discount_value}
            onChange={(e) =>
              setForm({ ...form, discount_value: e.target.value })
            }
            required
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">
            Max Uses (blank = unlimited)
          </label>
          <input
            type="number"
            value={form.max_uses}
            onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
            placeholder="∞"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">
            Valid Until (optional)
          </label>
          <input
            type="date"
            value={form.valid_until}
            onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={formLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {formLoading ? "Creating..." : "Create Coupon"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

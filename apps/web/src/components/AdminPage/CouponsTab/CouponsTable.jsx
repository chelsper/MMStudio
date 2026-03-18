import { ToggleLeft, ToggleRight, Trash2 } from "lucide-react";

export function CouponsTable({ coupons, onToggle, onDelete }) {
  if (coupons.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400 border-b border-slate-700">
            <th className="pb-3 pr-4">Code</th>
            <th className="pb-3 pr-4">Type</th>
            <th className="pb-3 pr-4">Value</th>
            <th className="pb-3 pr-4">Uses</th>
            <th className="pb-3 pr-4">Status</th>
            <th className="pb-3 pr-4">Expires</th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr
              key={c.id}
              className="border-b border-slate-800 hover:bg-slate-800/50"
            >
              <td className="py-3 pr-4 text-white font-mono font-bold">
                {c.code}
              </td>
              <td className="py-3 pr-4 text-slate-300 capitalize">
                {c.discount_type.replace("_", " ")}
              </td>
              <td className="py-3 pr-4 text-slate-300">
                {c.discount_type === "percent"
                  ? c.discount_value + "%"
                  : c.discount_type === "free_game"
                    ? c.discount_value + " game(s)"
                    : "$" + (c.discount_value / 100).toFixed(2)}
              </td>
              <td className="py-3 pr-4 text-slate-300">
                {c.times_used}/{c.max_uses || "∞"}
              </td>
              <td className="py-3 pr-4">
                {c.is_active ? (
                  <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded">
                    Active
                  </span>
                ) : (
                  <span className="text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded">
                    Inactive
                  </span>
                )}
              </td>
              <td className="py-3 pr-4 text-slate-400 text-xs">
                {c.valid_until
                  ? new Date(c.valid_until).toLocaleDateString()
                  : "Never"}
              </td>
              <td className="py-3">
                <div className="flex gap-1">
                  <button
                    onClick={() => onToggle(c.id)}
                    title={c.is_active ? "Deactivate" : "Activate"}
                    className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-purple-300 transition-colors"
                  >
                    {c.is_active ? (
                      <ToggleRight className="w-4 h-4" />
                    ) : (
                      <ToggleLeft className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(c.id)}
                    title="Delete coupon"
                    className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

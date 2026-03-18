export function DashboardTab({ stats }) {
  if (!stats) {
    return <p className="text-slate-400">Loading stats...</p>;
  }

  const cards = [
    { label: "Total Users", value: stats.totalUsers, color: "text-blue-400" },
    {
      label: "Total Mysteries",
      value: stats.totalMysteries,
      color: "text-purple-400",
    },
    {
      label: "Total Purchases",
      value: stats.totalPurchases,
      color: "text-green-400",
    },
    {
      label: "Active Subscriptions",
      value: stats.activeSubscriptions,
      color: "text-amber-400",
    },
    {
      label: "Total Revenue",
      value: "$" + (stats.totalRevenueCents / 100).toFixed(2),
      color: "text-emerald-400",
    },
    {
      label: "Coupon Codes",
      value: stats.totalCoupons,
      color: "text-pink-400",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6"
          >
            <p className="text-slate-400 text-sm mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

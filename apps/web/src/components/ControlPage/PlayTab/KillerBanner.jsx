export function KillerBanner() {
  return (
    <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-sm border-2 border-red-500/50 rounded-xl p-6 mb-6">
      <div className="text-center">
        <div className="text-4xl mb-3">🔪</div>
        <h3 className="text-2xl font-bold text-red-300 mb-2">
          You Are the Killer
        </h3>
        <p className="text-red-200 leading-relaxed">
          You committed the crime! Your goal is to{" "}
          <strong>deflect suspicion</strong> and avoid being caught.
        </p>
      </div>
    </div>
  );
}

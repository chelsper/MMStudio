export function VictimSection({ victim }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">💀 The Victim</h2>
      <div className="space-y-3">
        <div>
          <span className="text-purple-300 font-semibold">Name: </span>
          <span className="text-white">{victim.name}</span>
        </div>
        <div>
          <span className="text-purple-300 font-semibold">Background: </span>
          <span className="text-purple-100">{victim.background}</span>
        </div>
      </div>
    </div>
  );
}

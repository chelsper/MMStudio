export function PremiseSection({ premise }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-bold text-white mb-3">📖 The Story</h3>
      <p className="text-purple-100 leading-relaxed whitespace-pre-line">
        {premise}
      </p>
    </div>
  );
}

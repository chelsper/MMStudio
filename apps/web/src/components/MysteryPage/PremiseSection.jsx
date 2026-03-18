import { Target } from "lucide-react";

export function PremiseSection({ premise }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Target className="w-6 h-6 text-purple-400" />
        The Mystery
      </h2>
      <p className="text-purple-100 whitespace-pre-line leading-relaxed">
        {premise}
      </p>
    </div>
  );
}

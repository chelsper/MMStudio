import { ChevronIcon } from "./ChevronIcon";

export function CollapsibleSection({
  title,
  icon,
  expanded,
  onToggle,
  children,
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl mb-6 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex justify-between items-center hover:bg-white/5 transition-all"
      >
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-purple-400">{icon}</span>
          {title}
        </h2>
        <ChevronIcon expanded={expanded} />
      </button>
      {expanded && <div className="p-6 pt-0">{children}</div>}
    </div>
  );
}

import { Trash2 } from "lucide-react";

export function MysteriesTable({ mysteries, onDelete }) {
  if (mysteries.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400 border-b border-slate-700">
            <th className="pb-3 pr-4">ID</th>
            <th className="pb-3 pr-4">Creator</th>
            <th className="pb-3 pr-4">Setting</th>
            <th className="pb-3 pr-4">Players</th>
            <th className="pb-3 pr-4">Created</th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mysteries.map((m) => {
            const config =
              typeof m.config === "string" ? JSON.parse(m.config) : m.config;
            return (
              <tr
                key={m.id}
                className="border-b border-slate-800 hover:bg-slate-800/50"
              >
                <td className="py-3 pr-4 text-slate-300 font-mono text-xs">
                  <a
                    href={`/mystery/${m.id}`}
                    className="text-purple-400 hover:underline"
                  >
                    {m.id}
                  </a>
                </td>
                <td className="py-3 pr-4 text-white text-xs">
                  {m.user_email || "—"}
                </td>
                <td className="py-3 pr-4 text-slate-300">
                  <div>{config?.setting || "—"}</div>
                  {config?.visibility === "hidden" && (
                    <div className="text-[10px] text-fuchsia-300 uppercase tracking-wide">
                      private
                    </div>
                  )}
                </td>
                <td className="py-3 pr-4 text-slate-300">{m.player_count}</td>
                <td className="py-3 pr-4 text-slate-400 text-xs">
                  {new Date(m.created_at).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <button
                    onClick={() => onDelete(m.id)}
                    title="Delete mystery"
                    className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

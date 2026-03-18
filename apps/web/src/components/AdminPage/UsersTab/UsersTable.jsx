import { ShieldCheck, ShieldOff, Gift, Trash2 } from "lucide-react";

export function UsersTable({ users, actionLoading, onAction }) {
  if (users.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400 border-b border-slate-700">
            <th className="pb-3 pr-4">ID</th>
            <th className="pb-3 pr-4">Email</th>
            <th className="pb-3 pr-4">Name</th>
            <th className="pb-3 pr-4">Purchases</th>
            <th className="pb-3 pr-4">Mysteries</th>
            <th className="pb-3 pr-4">Admin</th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="border-b border-slate-800 hover:bg-slate-800/50"
            >
              <td className="py-3 pr-4 text-slate-300">{u.id}</td>
              <td className="py-3 pr-4 text-white">{u.email}</td>
              <td className="py-3 pr-4 text-slate-300">{u.name || "—"}</td>
              <td className="py-3 pr-4 text-slate-300">{u.purchase_count}</td>
              <td className="py-3 pr-4 text-slate-300">{u.mystery_count}</td>
              <td className="py-3 pr-4">
                {u.is_admin ? (
                  <span className="text-green-400 text-xs font-medium bg-green-400/10 px-2 py-1 rounded">
                    Admin
                  </span>
                ) : (
                  <span className="text-slate-500 text-xs">No</span>
                )}
              </td>
              <td className="py-3">
                <div className="flex gap-1">
                  <button
                    onClick={() => onAction("toggle_admin", u.id)}
                    disabled={actionLoading === u.id + "toggle_admin"}
                    title={u.is_admin ? "Remove admin" : "Make admin"}
                    className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-purple-300 transition-colors"
                  >
                    {u.is_admin ? (
                      <ShieldOff className="w-4 h-4" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onAction("grant_game", u.id, u.email)}
                    disabled={actionLoading === u.id + "grant_game"}
                    title="Grant free game"
                    className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-green-300 transition-colors"
                  >
                    <Gift className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAction("delete_user", u.id)}
                    disabled={actionLoading === u.id + "delete_user"}
                    title="Delete user"
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

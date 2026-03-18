import { useState, useEffect, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { UsersTable } from "./UsersTable";
import { Pagination } from "../Pagination";

export function UsersTab() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (search) params.set("search", search);
      const res = await fetch("/api/admin/users?" + params.toString());
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAction = async (action, userId, email) => {
    if (
      action === "delete_user" &&
      !confirm("Delete this user and all their data?")
    )
      return;
    setActionLoading(userId + action);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, userId, email }),
      });
      if (!res.ok) throw new Error("Action failed");
      fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Users</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email or name..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
        </div>
      ) : (
        <>
          <UsersTable
            users={users}
            actionLoading={actionLoading}
            onAction={handleAction}
          />

          {users.length === 0 && (
            <p className="text-slate-400 text-center py-8">No users found</p>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

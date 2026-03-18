import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { MysteriesTable } from "./MysteriesTable";
import { Pagination } from "../Pagination";

export function MysteriesTab() {
  const [mysteries, setMysteries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchMysteries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/mysteries?page=" + page);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMysteries(data.mysteries);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMysteries();
  }, [fetchMysteries]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this mystery and all its data?")) return;
    try {
      const res = await fetch("/api/admin/mysteries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", mysteryId: id }),
      });
      if (!res.ok) throw new Error("Failed");
      fetchMysteries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Mysteries</h2>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
        </div>
      ) : (
        <>
          <MysteriesTable mysteries={mysteries} onDelete={handleDelete} />

          {mysteries.length === 0 && (
            <p className="text-slate-400 text-center py-8">No mysteries yet</p>
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

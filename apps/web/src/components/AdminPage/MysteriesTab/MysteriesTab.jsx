import { useState, useEffect, useCallback } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { MysteriesTable } from "./MysteriesTable";
import { Pagination } from "../Pagination";

export function MysteriesTab() {
  const [mysteries, setMysteries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [creatingTemplate, setCreatingTemplate] = useState(null);

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

  const handleCreatePrivateTemplate = async (includeBonusCharacter) => {
    setCreatingTemplate(includeBonusCharacter ? "bonus" : "standard");
    try {
      const res = await fetch("/api/admin/mysteries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-private-template",
          templateSlug: "despair-at-blackwood-academy",
          includeBonusCharacter,
        }),
      });

      if (!res.ok) throw new Error("Failed to create private mystery");
      const data = await res.json();
      window.location.href = `/mystery/${data.mysteryId}`;
    } catch (err) {
      console.error(err);
      alert("Could not create the Blackwood private mystery.");
    } finally {
      setCreatingTemplate(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Mysteries</h2>
          <p className="text-slate-400 text-sm mt-1">
            Create and manage imported mystery instances.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleCreatePrivateTemplate(false)}
            disabled={creatingTemplate !== null}
            className="bg-fuchsia-700 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            {creatingTemplate === "standard" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Create Blackwood (10)
          </button>
          <button
            onClick={() => handleCreatePrivateTemplate(true)}
            disabled={creatingTemplate !== null}
            className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            {creatingTemplate === "bonus" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Create Blackwood + Rei (11)
          </button>
        </div>
      </div>

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

import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-slate-400 text-sm">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

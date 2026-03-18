import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-white text-xl flex items-center gap-3">
        <Loader2
          className="w-6 h-6"
          style={{ animation: "spin 1s linear infinite" }}
        />
        Loading mystery...
      </div>
    </div>
  );
}

import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
    </div>
  );
}

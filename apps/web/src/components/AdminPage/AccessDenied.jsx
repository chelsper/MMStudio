import { Shield } from "lucide-react";

export function AccessDenied() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-8 text-center max-w-md">
        <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-red-200">You don't have admin access.</p>
        <a
          href="/"
          className="inline-block mt-6 text-purple-300 hover:text-white underline"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}

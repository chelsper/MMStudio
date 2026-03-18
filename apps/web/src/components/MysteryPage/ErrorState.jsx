export function ErrorState({ error }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-400 text-xl mb-4">
          {error || "Mystery not found"}
        </div>
        <a href="/" className="text-purple-300 hover:text-purple-200 underline">
          Go home
        </a>
      </div>
    </div>
  );
}

export function EmailsList({ emails }) {
  return (
    <div className="space-y-3">
      {emails.map((em) => (
        <div
          key={em.id}
          className="bg-slate-800 border border-slate-700 rounded-lg p-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <p className="text-white font-medium text-sm">
              To: {em.recipient_email}
            </p>
            <p className="text-slate-500 text-xs">
              {new Date(em.created_at).toLocaleString()}
            </p>
          </div>
          <p className="text-purple-300 text-sm font-semibold mb-1">
            {em.subject}
          </p>
          {em.body_text && (
            <p className="text-slate-400 text-sm whitespace-pre-wrap line-clamp-3">
              {em.body_text}
            </p>
          )}
        </div>
      ))}
      {emails.length === 0 && (
        <p className="text-slate-400 text-center py-8">No email drafts yet</p>
      )}
    </div>
  );
}

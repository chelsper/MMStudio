import { useState, useEffect, useCallback } from "react";
import { Mail, Loader2 } from "lucide-react";
import { EmailComposer } from "./EmailComposer";
import { EmailsList } from "./EmailsList";

export function EmailsTab() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(false);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/emails");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setEmails(data.emails);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Emails</h2>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Compose
        </button>
      </div>

      {showCompose && (
        <EmailComposer
          onSuccess={() => {
            setShowCompose(false);
            fetchEmails();
          }}
          onCancel={() => setShowCompose(false)}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
        </div>
      ) : (
        <EmailsList emails={emails} />
      )}
    </div>
  );
}

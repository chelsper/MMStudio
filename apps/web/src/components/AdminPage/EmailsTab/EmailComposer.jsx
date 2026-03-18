import { useState } from "react";

export function EmailComposer({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    recipient_email: "",
    subject: "",
    body_text: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleCompose = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setSuccessMsg(null);
    try {
      const res = await fetch("/api/admin/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setSuccessMsg(data.message);
      setForm({ recipient_email: "", subject: "", body_text: "" });
      onSuccess();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCompose}
      className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 space-y-4"
    >
      {successMsg && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-200 text-sm">
          {successMsg}
        </div>
      )}
      <div>
        <label className="block text-slate-300 text-sm mb-1">To</label>
        <input
          type="email"
          value={form.recipient_email}
          onChange={(e) =>
            setForm({ ...form, recipient_email: e.target.value })
          }
          placeholder="user@example.com"
          required
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-slate-300 text-sm mb-1">Subject</label>
        <input
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Email subject"
          required
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-slate-300 text-sm mb-1">Body</label>
        <textarea
          value={form.body_text}
          onChange={(e) => setForm({ ...form, body_text: e.target.value })}
          rows={6}
          placeholder="Write your email..."
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={formLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {formLoading ? "Saving..." : "Save Email Draft"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Cancel
        </button>
      </div>
      <p className="text-slate-500 text-xs">
        Note: Drafts are saved to the database. To send emails automatically,
        connect a service like SendGrid or Resend.
      </p>
    </form>
  );
}

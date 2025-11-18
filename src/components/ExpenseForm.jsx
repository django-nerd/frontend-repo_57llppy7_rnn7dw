import { useEffect, useState } from "react";
import { Plus, Save } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export default function ExpenseForm({ onSaved, editing }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    description: "",
    amount: "",
    kind: "debit",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        date: editing.date?.slice(0,10) || new Date().toISOString().slice(0,10),
        description: editing.description || "",
        amount: editing.amount || "",
        kind: editing.kind || "debit",
      });
    }
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: Number(form.amount),
    };

    const url = editing?.id ? `${BACKEND_URL}/api/expenses/${editing.id}` : `${BACKEND_URL}/api/expenses`;
    const method = editing?.id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const t = await res.text();
      alert("Error: " + t);
      return;
    }
    setForm({ date: new Date().toISOString().slice(0,10), description: "", amount: "", kind: "debit" });
    onSaved?.();
  };

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-white/5 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-5 gap-3">
      <div>
        <label className="text-xs text-blue-200/70">Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          className="w-full mt-1 bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-xs text-blue-200/70">Description</label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="e.g., Groceries"
          className="w-full mt-1 bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="text-xs text-blue-200/70">Amount</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={form.amount}
          onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          className="w-full mt-1 bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="text-xs text-blue-200/70">Type</label>
        <select
          value={form.kind}
          onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value }))}
          className="w-full mt-1 bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="debit">Debit (Expense)</option>
          <option value="credit">Credit (Income)</option>
        </select>
      </div>
      <div className="flex items-end">
        <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition">
          {editing?.id ? <Save size={16} /> : <Plus size={16} />} {editing?.id ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}

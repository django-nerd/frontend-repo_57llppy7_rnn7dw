import { useEffect, useState } from "react";
import { PenSquare, Trash2 } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export default function ExpenseList({ month, year, onEdit, refreshKey }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const qs = new URLSearchParams();
    if (month) qs.set("month", month);
    if (year) qs.set("year", year);
    const res = await fetch(`${BACKEND_URL}/api/expenses?${qs.toString()}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year, refreshKey]);

  const remove = async (id) => {
    if (!confirm("Delete this record?")) return;
    const res = await fetch(`${BACKEND_URL}/api/expenses/${id}`, { method: "DELETE" });
    if (res.ok) load();
  };

  if (loading) return <div className="text-blue-200">Loading...</div>;

  return (
    <div className="bg-slate-800/60 border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-white/5 text-blue-200">
          <tr>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Description</th>
            <th className="text-right p-3">Debit</th>
            <th className="text-right p-3">Credit</th>
            <th className="text-right p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-t border-white/5 hover:bg-white/5">
              <td className="p-3 text-blue-100">{new Date(it.date).toLocaleDateString()}</td>
              <td className="p-3 text-blue-100">{it.description}</td>
              <td className="p-3 text-right text-rose-300">{it.kind === 'debit' ? it.amount.toFixed(2) : '-'}</td>
              <td className="p-3 text-right text-emerald-300">{it.kind === 'credit' ? it.amount.toFixed(2) : '-'}</td>
              <td className="p-3 text-right">
                <button onClick={() => onEdit(it)} className="inline-flex items-center gap-1 text-blue-300 hover:text-white mr-3">
                  <PenSquare size={16} /> Edit
                </button>
                <button onClick={() => remove(it.id)} className="inline-flex items-center gap-1 text-rose-300 hover:text-white">
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td className="p-6 text-center text-blue-200/70" colSpan={5}>No records yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

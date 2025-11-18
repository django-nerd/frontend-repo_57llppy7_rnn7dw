import { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export default function MonthlySummary({ month, year, refreshKey }) {
  const [summary, setSummary] = useState({ total_debit: 0, total_credit: 0, balance: 0 });

  const load = async () => {
    const qs = new URLSearchParams();
    if (month) qs.set("month", month);
    if (year) qs.set("year", year);
    const res = await fetch(`${BACKEND_URL}/api/summary?${qs.toString()}`);
    const data = await res.json();
    setSummary(data);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year, refreshKey]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="bg-slate-800/60 border border-white/5 rounded-xl p-4">
        <div className="text-blue-200 text-sm">Total Debit</div>
        <div className="mt-1 flex items-center gap-2 text-rose-300 text-2xl font-semibold">
          <ArrowDownCircle size={22} /> {summary.total_debit?.toFixed?.(2) ?? '0.00'}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-white/5 rounded-xl p-4">
        <div className="text-blue-200 text-sm">Total Credit</div>
        <div className="mt-1 flex items-center gap-2 text-emerald-300 text-2xl font-semibold">
          <ArrowUpCircle size={22} /> {summary.total_credit?.toFixed?.(2) ?? '0.00'}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-white/5 rounded-xl p-4">
        <div className="text-blue-200 text-sm">Balance</div>
        <div className={`mt-1 flex items-center gap-2 text-2xl font-semibold ${summary.balance >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
          <Wallet size={22} /> {summary.balance?.toFixed?.(2) ?? '0.00'}
        </div>
      </div>
    </div>
  );
}

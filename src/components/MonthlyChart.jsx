import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

function Bar({ label, debit, credit }) {
  const max = Math.max(debit, credit, 1);
  const debitH = (debit / max) * 100;
  const creditH = (credit / max) * 100;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-40 w-7 flex items-end gap-1">
        <div
          title={`Debit: ${debit.toFixed(2)}`}
          className="w-3 rounded bg-rose-400/70"
          style={{ height: `${debitH}%` }}
        />
        <div
          title={`Credit: ${credit.toFixed(2)}`}
          className="w-3 rounded bg-emerald-400/70"
          style={{ height: `${creditH}%` }}
        />
      </div>
      <div className="text-[10px] text-blue-200/80">{label}</div>
    </div>
  );
}

export default function MonthlyChart({ year }) {
  const [data, setData] = useState(Array.from({ length: 12 }, (_, i) => ({ month: i + 1, debit: 0, credit: 0 })));

  const load = async () => {
    const qs = new URLSearchParams();
    if (year) qs.set("year", year);
    const res = await fetch(`${BACKEND_URL}/api/monthly-chart?${qs.toString()}`);
    const list = await res.json();
    setData(list);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const monthLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div className="bg-slate-800/60 border border-white/5 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-blue-200">Monthly Totals</div>
        <div className="text-xs text-blue-200/70">Debit vs Credit</div>
      </div>
      <div className="grid grid-cols-12 gap-2">
        {data.map((d, i) => (
          <Bar key={i} label={monthLabels[d.month-1]} debit={d.debit} credit={d.credit} />
        ))}
      </div>
    </div>
  );
}

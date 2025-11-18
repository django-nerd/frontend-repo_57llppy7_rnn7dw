import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MonthlySummary from "./components/MonthlySummary";
import MonthlyChart from "./components/MonthlyChart";

const now = new Date();

export default function App() {
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [refreshKey, setRefreshKey] = useState(0);
  const [editing, setEditing] = useState(null);

  const months = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
  ];

  const years = useMemo(() => {
    const y = now.getFullYear();
    return Array.from({ length: 6 }, (_, i) => y - 3 + i);
  }, []);

  const onSaved = () => {
    setEditing(null);
    setRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    // reset editing when month/year changes
    setEditing(null);
  }, [month, year]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          <div className="col-span-1 sm:col-span-3">
            <label className="text-xs text-blue-200/70">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full mt-1 bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1 sm:col-span-3">
            <label className="text-xs text-blue-200/70">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full mt-1 bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <ExpenseForm onSaved={onSaved} editing={editing} />

        <MonthlySummary month={month} year={year} refreshKey={refreshKey} />

        <ExpenseList
          month={month}
          year={year}
          onEdit={(it) => setEditing(it)}
          refreshKey={refreshKey}
        />

        <MonthlyChart year={year} />
      </main>
    </div>
  );
}

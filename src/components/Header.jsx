import { Wallet } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-400/20">
            <Wallet size={22} />
          </div>
          <div>
            <h1 className="text-white font-semibold leading-tight">Monthly Expense Tracker</h1>
            <p className="text-xs text-blue-200/70">Track debits, credits, and balances</p>
          </div>
        </div>
        <a
          className="text-xs text-blue-200/70 hover:text-white transition"
          href="#"
        >
          v1.0
        </a>
      </div>
    </header>
  );
}

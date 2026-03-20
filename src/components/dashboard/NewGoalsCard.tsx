import { Target, TrendingUp, IndianRupee } from "lucide-react";

const TARGET      = 500000;   // ₹5L monthly target
const ACHIEVED    = 418240;
const PCT         = Math.min(100, Math.round((ACHIEVED / TARGET) * 100));

// SVG radial arc helper
const RADIUS = 52;
const STROKE = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const dashOffset = CIRCUMFERENCE * (1 - PCT / 100);

// Monthly revenue KPIs
const kpis = [
  { label: "This Month",  value: "₹4.18L", sub: `${PCT}% of target`, color: "text-primary" },
  { label: "Last Month",  value: "₹3.90L", sub: "-7% vs target",     color: "text-muted-foreground" },
  { label: "Best Month",  value: "₹5.24L", sub: "Dec 2025",          color: "text-emerald-500" },
];

const NewGoalsCard = () => (
  <div className="bg-card rounded-xl col-span-full lg:col-span-3 flex flex-col gap-0 overflow-hidden">

    {/* Radial target */}
    <div className="bg-primary/5 border-b border-border p-5 flex flex-col items-center">
      <div className="flex items-center gap-2 self-start mb-4">
        <Target className="w-4 h-4 text-primary" />
        <p className="text-sm font-semibold text-foreground">Monthly Target</p>
      </div>

      {/* SVG arc */}
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 130 130" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle
            cx="65" cy="65" r={RADIUS}
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth={STROKE}
          />
          {/* Progress */}
          <circle
            cx="65" cy="65" r={RADIUS}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className="transition-all duration-700"
          />
        </svg>
        {/* Centre labels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-foreground leading-none">{PCT}%</p>
          <p className="text-[11px] text-muted-foreground mt-1">achieved</p>
        </div>
      </div>

      {/* Target vs achieved row */}
      <div className="w-full flex justify-between text-xs mt-3">
        <div>
          <p className="text-muted-foreground">Achieved</p>
          <p className="font-bold text-foreground">₹4,18,240</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Target</p>
          <p className="font-bold text-foreground">₹5,00,000</p>
        </div>
      </div>

      {/* Remaining bar */}
      <div className="w-full mt-3">
        <div className="w-full bg-primary/10 rounded-full h-1.5">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${PCT}%` }} />
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5 text-center">
          ₹{((TARGET - ACHIEVED) / 1000).toFixed(1)}K remaining
        </p>
      </div>
    </div>

    {/* Monthly Revenue KPIs */}
    <div className="p-5 flex flex-col gap-0">
      <div className="flex items-center gap-2 mb-3">
        <IndianRupee className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-xs font-semibold text-foreground">Monthly Revenue</p>
      </div>
      <div className="divide-y divide-border">
        {kpis.map((k) => (
          <div key={k.label} className="flex items-center justify-between py-2.5">
            <div>
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="text-[11px] text-muted-foreground/60">{k.sub}</p>
            </div>
            <p className={`text-sm font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Best-seller badge */}
    <div className="mx-4 mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2.5">
      <div className="flex items-center gap-1.5 mb-0.5">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
        <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Best Seller · March</p>
      </div>
      <p className="text-xs font-semibold text-foreground">Wireless Earbuds Pro</p>
      <p className="text-[11px] text-muted-foreground">143 units · ₹71,357 revenue</p>
    </div>
  </div>
);

export default NewGoalsCard;
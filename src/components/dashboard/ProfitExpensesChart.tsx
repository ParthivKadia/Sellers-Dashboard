import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const monthlyData = [
  { month: "Aug", revenue: 182000, cogs: 91000,  opex: 27300 },
  { month: "Sep", revenue: 210000, cogs: 105000, opex: 31500 },
  { month: "Oct", revenue: 245000, cogs: 122500, opex: 36750 },
  { month: "Nov", revenue: 198000, cogs: 99000,  opex: 29700 },
  { month: "Dec", revenue: 310000, cogs: 155000, opex: 46500 }, // festive
  { month: "Jan", revenue: 270000, cogs: 135000, opex: 40500 },
  { month: "Feb", revenue: 234000, cogs: 117000, opex: 35100 },
  { month: "Mar", revenue: 288000, cogs: 144000, opex: 43200 },
];

// Derived P&L for chart (in ₹K for readability)
const chartData = monthlyData.map((d) => ({
  month: d.month,
  revenue:    Math.round(d.revenue / 1000),
  expenses:   Math.round((d.cogs + d.opex) / 1000),
  grossProfit: Math.round((d.revenue - d.cogs) / 1000),
  netProfit:  Math.round((d.revenue - d.cogs - d.opex) / 1000),
}));

// Totals
const totalRevenue    = monthlyData.reduce((s, d) => s + d.revenue, 0);
const totalCOGS       = monthlyData.reduce((s, d) => s + d.cogs, 0);
const totalOpex       = monthlyData.reduce((s, d) => s + d.opex, 0);
const grossProfit     = totalRevenue - totalCOGS;
const netProfit       = grossProfit - totalOpex;
const grossMarginPct  = ((grossProfit / totalRevenue) * 100).toFixed(1);
const netMarginPct    = ((netProfit   / totalRevenue) * 100).toFixed(1);

// MoM change for current month
const cur = monthlyData[monthlyData.length - 1];
const prv = monthlyData[monthlyData.length - 2];
const momRevChange = (((cur.revenue - prv.revenue) / prv.revenue) * 100).toFixed(1);
const momNetChange = ((((cur.revenue - cur.cogs - cur.opex) - (prv.revenue - prv.cogs - prv.opex)) /
                       Math.abs(prv.revenue - prv.cogs - prv.opex)) * 100).toFixed(1);

const fmt = (n: number) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(2)}L`
    : `₹${(n / 1000).toFixed(1)}K`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2.5 text-xs shadow-lg space-y-1">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: ₹{p.value}K
        </p>
      ))}
    </div>
  );
};

const Trend = ({ val }: { val: string }) => {
  const n = parseFloat(val);
  if (n > 0)  return <span className="flex items-center gap-0.5 text-emerald-500 text-[11px] font-semibold"><TrendingUp className="w-3 h-3" />+{val}%</span>;
  if (n < 0)  return <span className="flex items-center gap-0.5 text-destructive text-[11px] font-semibold"><TrendingDown className="w-3 h-3" />{val}%</span>;
  return <span className="flex items-center gap-0.5 text-muted-foreground text-[11px]"><Minus className="w-3 h-3" />0%</span>;
};

const ProfitExpensesChart = () => (
  <div className="bg-card rounded-xl p-6 col-span-full lg:col-span-7">
    <div className="flex items-start justify-between mb-5">
      <div>
        <h4 className="text-base font-semibold text-card-foreground">Profit & Loss</h4>
        <p className="text-xs text-muted-foreground mt-0.5">Aug 2025 – Mar 2026 · Revenue vs Total Expenses</p>
      </div>
      <div className="flex gap-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block"/></span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-destructive/70 inline-block"/></span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"/></span>
      </div>
    </div>

    {/* Chart */}
    <div className="h-[200px] mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barSize={11} barGap={3}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="month"
            axisLine={false} tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            axisLine={false} tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(v) => `₹${v}K`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--secondary))" }} />
          <Bar dataKey="revenue"    name="Revenue"    fill="hsl(var(--primary))"   radius={[3,3,0,0]} />
          <Bar dataKey="expenses"   name="Expenses"   fill="hsl(var(--destructive))" radius={[3,3,0,0]} opacity={0.7}/>
          <Bar dataKey="netProfit"  name="Net Profit" fill="hsl(142 71% 45%)"      radius={[3,3,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* P&L Summary table */}
    <div className="border border-border rounded-lg overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-secondary/60">
            <th className="text-left py-2.5 px-4 font-semibold text-muted-foreground">P&L Item</th>
            <th className="text-right py-2.5 px-4 font-semibold text-muted-foreground">8-Month Total</th>
            <th className="text-right py-2.5 px-4 font-semibold text-muted-foreground">Mar (Current)</th>
            <th className="text-right py-2.5 px-4 font-semibold text-muted-foreground">MoM</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[
            { label: "Revenue",       total: totalRevenue,  cur: cur.revenue,                        mom: momRevChange, color: "text-foreground",    bold: true  },
            { label: "Cost of Goods (COGS)", total: totalCOGS, cur: cur.cogs,                         mom: null,         color: "text-muted-foreground", bold: false },
            { label: "Gross Profit",  total: grossProfit,   cur: cur.revenue - cur.cogs,              mom: null,         color: "text-blue-500",      bold: true  },
            { label: "Operating Exp", total: totalOpex,     cur: cur.opex,                            mom: null,         color: "text-muted-foreground", bold: false },
            { label: "Net Profit",    total: netProfit,     cur: cur.revenue - cur.cogs - cur.opex,  mom: momNetChange, color: "text-emerald-500",   bold: true  },
          ].map((row) => (
            <tr key={row.label} className={row.bold ? "font-semibold" : ""}>
              <td className="py-2.5 px-4 text-foreground">{row.label}</td>
              <td className="py-2.5 px-4 text-right text-foreground">{fmt(row.total)}</td>
              <td className="py-2.5 px-4 text-right font-semibold" style={{ color: "inherit" }}>
                <span className={row.color}>{fmt(row.cur)}</span>
              </td>
              <td className="py-2.5 px-4 text-right">
                {row.mom ? <Trend val={row.mom} /> : <span className="text-muted-foreground">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-secondary/60 border-t border-border">
            <td colSpan={2} className="py-2.5 px-4 text-[11px] text-muted-foreground">
              Gross Margin: <span className="font-bold text-blue-500">{grossMarginPct}%</span>
              &nbsp;·&nbsp;Net Margin: <span className="font-bold text-emerald-500">{netMarginPct}%</span>
            </td>
            <td colSpan={2} className="py-2.5 px-4 text-right">
              <button className="bg-primary text-primary-foreground text-[11px] font-semibold px-3 py-1.5 rounded-md hover:opacity-90 transition">
                Export Report
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

export default ProfitExpensesChart;
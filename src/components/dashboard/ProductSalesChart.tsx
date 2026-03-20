import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Package } from "lucide-react";

// Monthly units sold across the store
const data = [
  { month: "Aug", units: 320 },
  { month: "Sep", units: 410 },
  { month: "Oct", units: 375 },
  { month: "Nov", units: 520 },
  { month: "Dec", units: 840 },  // festive spike
  { month: "Jan", units: 615 },
  { month: "Feb", units: 540 },
  { month: "Mar", units: 690 },
];

// Top 3 categories this month
const topCategories = [
  { name: "Electronics",  units: 243, pct: 35 },
  { name: "Clothing",     units: 189, pct: 27 },
  { name: "Home & Kitchen", units: 148, pct: 21 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-primary">{payload[0].value} units sold</p>
    </div>
  );
};

const ProductSalesChart = () => {
  const thisMonth = data[data.length - 1].units;
  const lastMonth = data[data.length - 2].units;
  const growth    = (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1);
  const isUp      = thisMonth >= lastMonth;

  return (
    <div className="bg-card rounded-xl p-6 col-span-full lg:col-span-5">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-base font-semibold text-card-foreground">Units Sold</h4>
          <p className="text-xs text-muted-foreground">Monthly trend · all categories</p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          isUp
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-destructive/10 text-destructive"
        }`}>
          {isUp ? "+" : ""}{growth}% MoM
        </span>
      </div>

      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="units"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top categories */}
      <div className="mt-3 pt-4 border-t border-border space-y-2.5">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-primary" />
          <p className="text-xs font-semibold text-foreground">Top Categories · March</p>
        </div>
        {topCategories.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">{cat.name}</span>
              <span className="font-semibold text-foreground">{cat.units} units</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-all"
                style={{ width: `${cat.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSalesChart;
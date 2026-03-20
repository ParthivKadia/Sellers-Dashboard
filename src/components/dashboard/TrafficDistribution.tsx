import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Direct / Website",  value: 4820, color: "hsl(var(--primary))",    change: "+18%" },
  { name: "Marketplace",       value: 3640, color: "hsl(142 71% 45%)",        change: "+31%" },
  { name: "Social Commerce",   value: 2210, color: "hsl(38 92% 50%)",         change: "+9%"  },
  { name: "Referral",          value: 1180, color: "hsl(var(--destructive))",  change: "-4%"  },
];

const total = data.reduce((s, d) => s + d.value, 0);

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground">{d.value.toLocaleString()} orders ({((d.value / total) * 100).toFixed(1)}%)</p>
    </div>
  );
};

const TrafficDistribution = () => {
  return (
    <div className="bg-card rounded-xl p-6 col-span-full lg:col-span-5">
      <div className="mb-4">
        <h4 className="text-base font-semibold text-card-foreground">Order Sources</h4>
        <p className="text-xs text-muted-foreground mt-0.5">Where your orders come from</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut */}
        <div className="relative w-[140px] h-[140px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={65}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-lg font-bold text-foreground">{(total / 1000).toFixed(1)}K</p>
            <p className="text-[10px] text-muted-foreground">total orders</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1">
          {data.map((item) => {
            const pct = ((item.value / total) * 100).toFixed(0);
            const isUp = item.change.startsWith("+");
            return (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground truncate">{item.name}</p>
                    <span className={`text-[11px] font-semibold ml-1 shrink-0 ${isUp ? "text-emerald-500" : "text-destructive"}`}>
                      {item.change}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 bg-secondary rounded-full h-1">
                      <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: item.color }} />
                    </div>
                    <span className="text-[11px] font-semibold text-foreground shrink-0">{pct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrafficDistribution;
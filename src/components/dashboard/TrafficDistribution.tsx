import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Organic Traffic", value: 4106, color: "hsl(207 90% 54%)", change: "+23%" },
  { name: "Referral Traffic", value: 3500, color: "hsl(0 84% 60%)" },
  { name: "Direct Traffic", value: 3319, color: "hsl(38 92% 50%)" },
  { name: "Other", value: 5368, color: "hsl(220 13% 80%)" },
];

const TrafficDistribution = () => {
  return (
    <div className="bg-card rounded-xl p-6 col-span-full lg:col-span-4">
      <h4 className="text-base font-semibold text-card-foreground mb-4">Traffic Distribution</h4>
      <div className="flex items-center gap-4">
        <div className="w-[140px] h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {item.value.toLocaleString()}
                  {item.change && <span className="text-xs text-success ml-1">{item.change}</span>}
                </p>
                <p className="text-xs text-muted-foreground">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficDistribution;

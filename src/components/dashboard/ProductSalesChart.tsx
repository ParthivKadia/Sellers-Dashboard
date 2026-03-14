import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";

const data = [
  { year: "2016", value: 20 },
  { year: "2017", value: 35 },
  { year: "2018", value: 25 },
  { year: "2019", value: 55 },
  { year: "2020", value: 40 },
  { year: "2021", value: 65 },
  { year: "2022", value: 45 },
];

const ProductSalesChart = () => {
  return (
    <div className="bg-card rounded-xl p-6 col-span-full lg:col-span-4">
      <h4 className="text-base font-semibold text-card-foreground mb-4">Product Sales</h4>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(220 10% 46%)' }} />
            <Line type="monotone" dataKey="value" stroke="hsl(207 90% 54%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
        <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">
            36,436 <span className="text-xs font-medium text-success bg-success/10 px-1.5 py-0.5 rounded ml-1">+12%</span>
          </p>
          <p className="text-sm text-muted-foreground">New Customer</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSalesChart;

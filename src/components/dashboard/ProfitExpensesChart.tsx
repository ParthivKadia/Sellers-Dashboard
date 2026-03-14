import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { month: "Aug", value: 55 },
  { month: "Sep", value: 48 },
  { month: "Oct", value: 62 },
  { month: "Nov", value: 38 },
  { month: "Dec", value: 45 },
  { month: "Jan", value: 70 },
  { month: "Feb", value: 52 },
  { month: "March", value: 60 },
];

const ProfitExpensesChart = () => {
  return (
    <div className="bg-card rounded-xl p-6 col-span-full lg:col-span-8">
      <h4 className="text-base font-semibold text-card-foreground mb-6">Profit & Expenses</h4>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(220 10% 46%)' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(220 10% 46%)' }} />
              <Bar dataKey="value" fill="hsl(207 90% 54%)" radius={[6, 6, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-4 min-w-[180px]">
          <div>
            <p className="text-sm text-muted-foreground">Profit</p>
            <p className="text-xl font-bold text-foreground">$63,489.50</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expenses</p>
            <p className="text-xl font-bold text-foreground">$48,820.00</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Overall earnings</p>
            <p className="text-xl font-bold text-foreground">$103,582.50</p>
          </div>
          <button className="mt-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition w-full">
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfitExpensesChart;

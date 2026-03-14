import { DollarSign, RefreshCcw, TrendingUp } from "lucide-react";

const stats = [
  { value: "235", change: "+23%", label: "Sales", color: "bg-primary", icon: DollarSign },
  { value: "356", change: "+8%", label: "Refunds", color: "bg-warning", icon: RefreshCcw },
  { value: "280", change: "-3%", label: "Earnings", color: "bg-success", icon: TrendingUp },
];

const StatCards = () => {
  return (
    <>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className={`${stat.color} rounded-xl p-5 text-primary-foreground col-span-full sm:col-span-1`}>
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs font-medium opacity-80">{stat.change}</span>
            </div>
            <p className="text-sm opacity-80 mt-0.5">{stat.label}</p>
          </div>
        );
      })}
    </>
  );
};

export default StatCards;

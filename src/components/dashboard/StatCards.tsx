import { IndianRupee, ShoppingCart, AlertTriangle } from "lucide-react";

const stats = [
  {
    value: "₹4.2L",
    change: "+18%",
    changeUp: true,
    label: "Total Revenue",
    sub: "This month",
    color: "bg-primary",
    icon: IndianRupee,
  },
  {
    value: "1,284",
    change: "+11%",
    changeUp: true,
    label: "Total Orders",
    sub: "This month",
    color: "bg-emerald-500",
    icon: ShoppingCart,
  },
  {
    value: "9",
    change: "–3 SKUs",
    changeUp: false,
    label: "Low Stock",
    sub: "Needs restock",
    color: "bg-amber-500",
    icon: AlertTriangle,
  },
];

const StatCards = () => {
  return (
    <>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.color} rounded-xl p-5 text-primary-foreground col-span-full sm:col-span-1`}
          >
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                  stat.changeUp
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-primary-foreground/10 text-primary-foreground/70"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium mt-0.5">{stat.label}</p>
            <p className="text-[11px] opacity-60 mt-0.5">{stat.sub}</p>
          </div>
        );
      })}
    </>
  );
};

export default StatCards;
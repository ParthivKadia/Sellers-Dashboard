import { useState } from "react";
import { ShoppingBag, Clock, CheckCircle2, XCircle, Truck, ArrowRight } from "lucide-react";

const allOrders = [
  { id: "#ORD-8831", product: "Wireless Earbuds Pro",       amount: "₹4,999", status: "Delivered",  statusColor: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-500/10", icon: CheckCircle2 },
  { id: "#ORD-8829", product: "Cotton Kurta Set × 2",       amount: "₹2,598", status: "Shipped",    statusColor: "text-blue-500",                           bgColor: "bg-blue-500/10",    icon: Truck        },
  { id: "#ORD-8827", product: "Bamboo Cutting Board",       amount: "₹899",   status: "Delivered",  statusColor: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-500/10", icon: CheckCircle2 },
  { id: "#ORD-8824", product: "Steel Water Bottle 1L × 3",  amount: "₹1,947", status: "Processing", statusColor: "text-amber-500",                          bgColor: "bg-amber-500/10",   icon: Clock        },
  { id: "#ORD-8821", product: "Yoga Mat Premium",           amount: "₹2,199", status: "Cancelled",  statusColor: "text-destructive",                        bgColor: "bg-destructive/10", icon: XCircle      },
  { id: "#ORD-8818", product: "Phone Stand Foldable",       amount: "₹399",   status: "Delivered",  statusColor: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-500/10", icon: CheckCircle2 },
  { id: "#ORD-8815", product: "Yoga Mat Premium × 2",       amount: "₹4,398", status: "Cancelled",  statusColor: "text-destructive",                        bgColor: "bg-destructive/10", icon: XCircle      },
];

type Tab = "All" | "Delivered" | "Shipped" | "Cancelled";

const tabs: Tab[] = ["All", "Delivered", "Shipped", "Cancelled"];

const tabCount = (t: Tab) =>
  t === "All" ? allOrders.length : allOrders.filter((o) => o.status === t).length;

const RecentOrdersCard = () => {
  const [active, setActive] = useState<Tab>("All");

  const visible = active === "All"
    ? allOrders
    : allOrders.filter((o) => o.status === active);

  return (
    <div className="bg-card rounded-xl overflow-hidden col-span-full lg:col-span-4 flex flex-col h-full">

      {/* Header */}
      <div className="px-5 pt-4 pb-0 border-b border-border shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Order History</h4>
          </div>
          <button className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 -mb-px">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold border-b-2 transition-colors whitespace-nowrap ${
                active === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                active === t ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
              }`}>
                {tabCount(t)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Order list */}
      <div className="flex-1 divide-y divide-border overflow-y-auto">
        {visible.length === 0 ? (
          <p className="text-center text-xs text-muted-foreground py-8">No orders in this category.</p>
        ) : (
          visible.map((order) => {
            const StatusIcon = order.icon;
            return (
              <div key={order.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/30 transition-colors">
                <div className={`w-8 h-8 rounded-lg ${order.bgColor} flex items-center justify-center shrink-0`}>
                  <StatusIcon className={`w-3.5 h-3.5 ${order.statusColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{order.product}</p>
                  <p className="text-[11px] text-muted-foreground font-mono">{order.id}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-foreground">{order.amount}</p>
                  <p className={`text-[11px] font-semibold ${order.statusColor}`}>{order.status}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 border-t border-border bg-secondary/20 shrink-0">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {allOrders.filter((o) => o.status === "Delivered").length}
            </span>{" "}delivered
          </span>
          <span>
            <span className="font-semibold text-blue-500">
              {allOrders.filter((o) => o.status === "Shipped").length}
            </span>{" "}in transit
          </span>
          <span>
            <span className="font-semibold text-destructive">
              {allOrders.filter((o) => o.status === "Cancelled").length}
            </span>{" "}cancelled
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersCard;
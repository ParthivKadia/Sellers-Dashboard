import { Truck, Clock, AlertCircle, CheckCircle2, Package, ArrowRight } from "lucide-react";

// Orders placed but not yet shipped
// In a real app: GET /v1/stores/{username}/orders?status=pending
const pendingOrders = [
  {
    id: "#ORD-8831",
    customer: "Priya Sharma",
    product: "Wireless Earbuds Pro",
    amount: "₹4,999",
    placedAt: "Today, 09:14 AM",
    hoursAgo: 2,
    items: 1,
    address: "Mumbai, MH",
    urgent: true,
  },
  {
    id: "#ORD-8829",
    customer: "Rahul Verma",
    product: "Cotton Kurta Set × 2",
    amount: "₹2,598",
    placedAt: "Today, 07:45 AM",
    hoursAgo: 4,
    items: 2,
    address: "Delhi, DL",
    urgent: true,
  },
  {
    id: "#ORD-8824",
    customer: "Anita Patel",
    product: "Steel Bottle 1L × 3",
    amount: "₹1,947",
    placedAt: "Yesterday, 11:30 PM",
    hoursAgo: 11,
    items: 3,
    address: "Ahmedabad, GJ",
    urgent: false,
  },
  {
    id: "#ORD-8821",
    customer: "Sunita Rao",
    product: "Bamboo Cutting Board",
    amount: "₹899",
    placedAt: "Yesterday, 06:20 PM",
    hoursAgo: 16,
    items: 1,
    address: "Bangalore, KA",
    urgent: false,
  },
  {
    id: "#ORD-8818",
    customer: "Mohit Jain",
    product: "Yoga Mat Premium",
    amount: "₹2,199",
    placedAt: "Yesterday, 02:10 PM",
    hoursAgo: 20,
    items: 1,
    address: "Pune, MH",
    urgent: false,
  },
];

const urgentCount = pendingOrders.filter((o) => o.urgent).length;

const UrgencyBadge = ({ hoursAgo }: { hoursAgo: number }) => {
  if (hoursAgo <= 4)
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
        <AlertCircle className="w-3 h-3" /> Urgent
      </span>
    );
  if (hoursAgo <= 12)
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
        <Clock className="w-3 h-3" /> Soon
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
};

const PendingShipmentsCard = () => (
  <div className="bg-card rounded-xl col-span-full flex flex-col">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <Truck className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            Pending Shipments
            <span className="ml-2 text-xs bg-destructive/10 text-destructive font-bold px-2 py-0.5 rounded-full">
              {pendingOrders.length}
            </span>
          </h4>
          <p className="text-[11px] text-muted-foreground">
            {urgentCount} urgent · dispatch within 24 hrs to maintain seller rating
          </p>
        </div>
      </div>
      <button className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
        View all orders <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/30">
            {["Order", "Customer", "Product", "Items", "Amount", "Location", "Placed", "Priority", "Action"].map((h) => (
              <th key={h} className="text-left py-2.5 px-4 text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pendingOrders.map((order) => (
            <tr
              key={order.id}
              className={`border-b border-border last:border-0 hover:bg-secondary/20 transition-colors ${
                order.urgent ? "bg-destructive/[0.02]" : ""
              }`}
            >
              {/* Order ID */}
              <td className="py-3.5 px-4">
                <span className="text-xs font-bold text-foreground font-mono">{order.id}</span>
              </td>

              {/* Customer */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-primary">
                      {order.customer.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">{order.customer}</span>
                </div>
              </td>

              {/* Product */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs text-foreground whitespace-nowrap">{order.product}</span>
                </div>
              </td>

              {/* Items */}
              <td className="py-3.5 px-4">
                <span className="text-xs font-semibold text-foreground">{order.items}</span>
              </td>

              {/* Amount */}
              <td className="py-3.5 px-4">
                <span className="text-xs font-bold text-foreground">{order.amount}</span>
              </td>

              {/* Location */}
              <td className="py-3.5 px-4">
                <span className="text-xs text-muted-foreground whitespace-nowrap">{order.address}</span>
              </td>

              {/* Placed time */}
              <td className="py-3.5 px-4">
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">{order.placedAt}</span>
              </td>

              {/* Priority */}
              <td className="py-3.5 px-4">
                <UrgencyBadge hoursAgo={order.hoursAgo} />
              </td>

              {/* Action */}
              <td className="py-3.5 px-4">
                <button className="flex items-center gap-1.5 text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition whitespace-nowrap">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mark Shipped
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Footer summary */}
    <div className="px-6 py-3 border-t border-border flex items-center justify-between bg-secondary/20">
      <p className="text-xs text-muted-foreground">
        Total pending value:{" "}
        <span className="font-bold text-foreground">
          ₹{pendingOrders.reduce((s, o) => s + parseInt(o.amount.replace(/[^\d]/g, "")), 0).toLocaleString("en-IN")}
        </span>
      </p>
      <button className="text-xs bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-1.5 rounded-lg transition">
        Bulk Mark as Shipped
      </button>
    </div>
  </div>
);

export default PendingShipmentsCard;
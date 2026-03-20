import { AlertTriangle, PackageX, ArrowRight } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

// In a real app: GET /v1/stores/{username}/products?pageSize=20
// then filter client-side where stockCount <= threshold
const lowStockItems = [
  {
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    stock: 3,
    threshold: 10,
    slug: "wireless-earbuds-pro",
  },
  {
    name: "Cotton Kurta — Blue XL",
    category: "Clothing",
    stock: 0,
    threshold: 15,
    slug: "cotton-kurta-blue-xl",
  },
  {
    name: "Steel Bottle 1L",
    category: "Home & Kitchen",
    stock: 7,
    threshold: 20,
    slug: "steel-bottle-1l",
  },
  {
    name: "Yoga Mat Premium",
    category: "Sports",
    stock: 2,
    threshold: 10,
    slug: "yoga-mat-premium",
  },
  {
    name: "Phone Stand Foldable",
    category: "Accessories",
    stock: 0,
    threshold: 25,
    slug: "phone-stand-foldable",
  },
];

const outOfStockCount = lowStockItems.filter((i) => i.stock === 0).length;
const lowCount = lowStockItems.filter((i) => i.stock > 0).length;

const StockBadge = ({ stock }: { stock: number }) => {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive whitespace-nowrap">
        <PackageX className="w-3 h-3" /> Out of stock
      </span>
    );
  }
  return (
    <span className="inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 whitespace-nowrap">
      {stock} left
    </span>
  );
};

const LowStockAlerts = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl col-span-full lg:col-span-5 flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h4 className="text-sm font-semibold text-foreground">Low Stock Alerts</h4>
          <div className="flex items-center gap-1.5 ml-1">
            <span className="text-[11px] bg-destructive/10 text-destructive font-bold px-1.5 py-0.5 rounded-full">
              {outOfStockCount} out
            </span>
            <span className="text-[11px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-1.5 py-0.5 rounded-full">
              {lowCount} low
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/${username}/inventory`)}
          className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"
        >
          Manage <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 divide-y divide-border">
        {lowStockItems.map((item) => {
          const pct = Math.min(100, Math.round((item.stock / item.threshold) * 100));
          const isOut = item.stock === 0;

          return (
            <div key={item.slug} className="flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/30 transition-colors">
              {/* Dot indicator */}
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${isOut ? "bg-destructive" : "bg-amber-500"}`}
              />

              {/* Name + mini bar */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{item.name}</p>
                <p className="text-[11px] text-muted-foreground">{item.category}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 bg-secondary rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${isOut ? "bg-destructive" : "bg-amber-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0 font-medium">
                    min {item.threshold}
                  </span>
                </div>
              </div>

              <StockBadge stock={item.stock} />
            </div>
          );
        })}
      </div>

      {/* CTA footer */}
      <div className="p-4 border-t border-border shrink-0">
        <button
          onClick={() => navigate(`/${username}/inventory`)}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2.5 rounded-lg transition"
        >
          Restock All Low Items →
        </button>
      </div>
    </div>
  );
};

export default LowStockAlerts;
import { TrendingUp, TrendingDown, Star, Package } from "lucide-react";

const products = [
  {
    rank: 1,
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 4999,
    unitsSold: 143,
    revenue: 714857,
    cogs: 285943,
    growth: 34,
    isFeatured: true,
    status: "In Stock",
    stock: 28,
  },
  {
    rank: 2,
    name: "Cotton Kurta Set",
    category: "Clothing",
    price: 1299,
    unitsSold: 298,
    revenue: 387102,
    cogs: 154841,
    growth: 12,
    isFeatured: false,
    status: "Low Stock",
    stock: 7,
  },
  {
    rank: 3,
    name: "Steel Water Bottle 1L",
    category: "Home & Kitchen",
    price: 649,
    unitsSold: 512,
    revenue: 332288,
    cogs: 99687,
    growth: 28,
    isFeatured: true,
    status: "In Stock",
    stock: 84,
  },
  {
    rank: 4,
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 2199,
    unitsSold: 89,
    revenue: 195711,
    cogs: 78284,
    growth: -8,
    isFeatured: false,
    status: "Out of Stock",
    stock: 0,
  },
  {
    rank: 5,
    name: "Phone Stand Foldable",
    category: "Accessories",
    price: 399,
    unitsSold: 421,
    revenue: 167979,
    cogs: 50394,
    growth: 5,
    isFeatured: false,
    status: "Out of Stock",
    stock: 0,
  },
  {
    rank: 6,
    name: "Bamboo Cutting Board",
    category: "Home & Kitchen",
    price: 899,
    unitsSold: 167,
    revenue: 150133,
    cogs: 60053,
    growth: 19,
    isFeatured: false,
    status: "In Stock",
    stock: 43,
  },
];

const maxUnits   = Math.max(...products.map((p) => p.unitsSold));
const fmt        = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(2)}L` : `₹${(n / 1000).toFixed(1)}K`;
const totalSold  = products.reduce((s, p) => s + p.unitsSold, 0);
const totalRev   = products.reduce((s, p) => s + p.revenue, 0);

const statusStyle = (s: string) =>
  s === "In Stock"    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  : s === "Low Stock" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  :                     "bg-destructive/10 text-destructive";

const TopProductsTable = () => (
  <div className="bg-card rounded-xl p-6 col-span-full">
    {/* Header */}
    <div className="flex items-center justify-between mb-5">
      <div>
        <h4 className="text-base font-semibold text-card-foreground">Top Selling Products</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          March 2026 · {totalSold.toLocaleString()} units sold · {fmt(totalRev)} revenue
        </p>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5" />
          {products.length} products shown
        </span>
        <button className="text-primary font-medium hover:underline">View all →</button>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {["#", "Product", "Category", "Price", "Units Sold", "Revenue", "Gross Margin", "Growth", "Stock"].map((h) => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const grossProfit  = p.revenue - p.cogs;
            const marginPct    = ((grossProfit / p.revenue) * 100).toFixed(0);
            const soldBarWidth = Math.round((p.unitsSold / maxUnits) * 100);

            return (
              <tr key={p.rank} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors group">

                {/* Rank */}
                <td className="py-3.5 px-3">
                  <span className="text-xs font-bold text-muted-foreground">#{p.rank}</span>
                </td>

                {/* Product name */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground whitespace-nowrap">{p.name}</p>
                    {p.isFeatured && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />}
                  </div>
                </td>

                {/* Category */}
                <td className="py-3.5 px-3">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
                    {p.category}
                  </span>
                </td>

                {/* Price */}
                <td className="py-3.5 px-3 text-sm font-medium text-foreground whitespace-nowrap">
                  ₹{p.price.toLocaleString("en-IN")}
                </td>

                {/* Units sold with inline bar */}
                <td className="py-3.5 px-3 min-w-[130px]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground w-8 shrink-0">
                      {p.unitsSold}
                    </span>
                    <div className="flex-1 bg-secondary rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${soldBarWidth}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Revenue */}
                <td className="py-3.5 px-3 font-bold text-foreground whitespace-nowrap">
                  {fmt(p.revenue)}
                </td>

                {/* Gross margin */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">{marginPct}%</span>
                    <div className="w-12 bg-secondary rounded-full h-1.5">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full"
                        style={{ width: `${marginPct}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Growth */}
                <td className="py-3.5 px-3">
                  <span className={`flex items-center gap-1 text-xs font-semibold whitespace-nowrap ${p.growth >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                    {p.growth >= 0
                      ? <TrendingUp className="w-3.5 h-3.5" />
                      : <TrendingDown className="w-3.5 h-3.5" />}
                    {p.growth >= 0 ? "+" : ""}{p.growth}%
                  </span>
                </td>

                {/* Stock status */}
                <td className="py-3.5 px-3">
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit ${statusStyle(p.status)}`}>
                      {p.status}
                    </span>
                    {p.stock > 0 && (
                      <span className="text-[10px] text-muted-foreground pl-1">{p.stock} left</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>

        {/* Totals footer */}
        <tfoot>
          <tr className="border-t-2 border-border bg-secondary/40">
            <td colSpan={4} className="py-3 px-3 text-xs font-semibold text-muted-foreground">Totals</td>
            <td className="py-3 px-3 text-sm font-bold text-foreground">{totalSold.toLocaleString()}</td>
            <td className="py-3 px-3 text-sm font-bold text-foreground">{fmt(totalRev)}</td>
            <td colSpan={3} className="py-3 px-3 text-xs text-muted-foreground">
              Avg margin: <span className="font-bold text-emerald-500">
                {(products.reduce((s, p) => s + ((p.revenue - p.cogs) / p.revenue) * 100, 0) / products.length).toFixed(1)}%
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

export default TopProductsTable;
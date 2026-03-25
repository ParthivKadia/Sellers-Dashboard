import MarketingPage from "./MarketingPage";

export default function CartRecovery() {
  return (
    <MarketingPage
      title="Abandoned Cart"
      subtitle="Recover lost sales with cart reminders and checkout recovery campaigns"
      stats={[
        { label: "Abandoned Carts", value: "214", subtext: "This month", color: "#2563eb", bg: "#eff6ff", icon: "🛒" },
        { label: "Recovered Orders", value: "62", subtext: "29% recovery rate", color: "#16a34a", bg: "#f0fdf4", icon: "🔄" },
        { label: "Recovered Revenue", value: "₹71K", subtext: "From reminders", color: "#d97706", bg: "#fffbeb", icon: "💸" },
        { label: "Avg Cart Value", value: "₹1,940", subtext: "Among abandoned carts", color: "#9333ea", bg: "#faf5ff", icon: "📦" },
      ]}
      chartTitle="Cart Recovery Trend"
      chartBars={[14, 18, 24, 29, 35, 31]}
      chartLabels={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]}
      sideTitle="Recovery Insights"
      sideItems={[
        { label: "Best Recovery Channel", value: "Email", color: "#2563eb" },
        { label: "Top Recovery Window", value: "Within 6 hrs", color: "#16a34a" },
        { label: "Highest Value Segment", value: "VIP users", color: "#9333ea" },
        { label: "Lost Revenue", value: "₹1.8L", color: "#dc2626" },
      ]}
      tableTitle="Recovery Flows"
      tableRows={[
        { name: "1-Hour Reminder", meta: "Instant abandonment flow", value: "22 recoveries", extra: "Best conversion" },
        { name: "24-Hour Offer Email", meta: "Includes coupon reminder", value: "18 recoveries", extra: "Strong revenue" },
        { name: "WhatsApp Follow-up", meta: "High intent carts", value: "11 recoveries", extra: "Premium segment" },
      ]}
    />
  );
}

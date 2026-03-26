import AnalyticsDashboardPage from "./AnalyticsDashboardPage";

const segmentation = [
  { label: "New Customers", value: "54", subtext: "+12 this week", color: "#2563eb", bg: "#eff6ff", icon: "🆕" },
  { label: "Repeat Buyers", value: "318", subtext: "37.7% of total", color: "#16a34a", bg: "#f0fdf4", icon: "🔁" },
  { label: "VIP Customers", value: "46", subtext: "High-value segment", color: "#9333ea", bg: "#faf5ff", icon: "💎" },
  { label: "Inactive", value: "72", subtext: "No order in 60 days", color: "#dc2626", bg: "#fef2f2", icon: "⏸" },
];

const topCities = [
  { city: "Mumbai", customers: 184, revenue: "₹2.12L", width: "92%" },
  { city: "Delhi", customers: 162, revenue: "₹1.96L", width: "84%" },
  { city: "Bengaluru", customers: 129, revenue: "₹1.54L", width: "68%" },
  { city: "Pune", customers: 96, revenue: "₹1.08L", width: "52%" },
  { city: "Hyderabad", customers: 74, revenue: "₹86K", width: "41%" },
];

const activities = [
  { name: "Aarav Sharma", action: "Placed first order", value: "₹2,499", time: "2 hrs ago", tag: "New" },
  { name: "Priya Mehta", action: "Completed 10th purchase", value: "₹1,599", time: "4 hrs ago", tag: "Repeat" },
  { name: "Ananya Rao", action: "Left a 5-star review", value: "Earbuds Pro", time: "Today", tag: "Review" },
  { name: "Kabir Singh", action: "Became VIP customer", value: "₹22,499 total", time: "Yesterday", tag: "VIP" },
  { name: "Diya Nair", action: "Returned after 45 days", value: "₹1,299", time: "Yesterday", tag: "Reactivated" },
];

export default function CustomerInsights() {
  return (
    <AnalyticsDashboardPage
      title="Customer Insights"
      subtitle="Understand growth, loyalty, city performance, and customer behavior"
      stats={segmentation}
      chartTitle="Top Cities"
      chartBars={topCities.map((item) => item.customers)}
      chartLabels={topCities.map((item) => item.city)}
      sideTitle="Repeat vs New"
      sideItems={[
        { label: "Repeat Customers", value: "65%", color: "#16a34a" },
        { label: "New Customers", value: "26%", color: "#2563eb" },
        { label: "Inactive", value: "9%", color: "#64748b" },
        { label: "Total Customers", value: "842", color: "#0f172a" },
      ]}
      tableTitle="Recent Customer Activity"
      tableRows={activities.map((item) => ({
        name: item.name,
        meta: `${item.action} • ${item.time}`,
        value: item.value,
        extra: item.tag,
      }))}
    />
  );
}

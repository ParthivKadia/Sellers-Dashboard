import StorePage from "./StorePage";

export default function TaxSettings() {
  return (
    <StorePage
      title="Tax Settings"
      subtitle="Manage GST, category tax rules, and compliance-ready billing settings"
      stats={[
        { label: "GST Registered", value: "Yes", subtext: "Business tax profile active", color: "#2563eb", bg: "#eff6ff", icon: "🧾" },
        { label: "Tax Rules", value: "8", subtext: "Mapped to categories", color: "#16a34a", bg: "#f0fdf4", icon: "📘" },
        { label: "Invoices Issued", value: "1,248", subtext: "This month", color: "#d97706", bg: "#fffbeb", icon: "📄" },
        { label: "Compliance Status", value: "Healthy", subtext: "No active issues", color: "#9333ea", bg: "#faf5ff", icon: "✔" },
      ]}
      chartTitle="Tax Collection Trend"
      chartBars={[18, 24, 29, 36, 41, 46]}
      chartLabels={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]}
      sideTitle="Tax Overview"
      sideItems={[
        { label: "Primary Tax", value: "GST 18%", color: "#2563eb" },
        { label: "Reduced Tax", value: "GST 5%", color: "#16a34a" },
        { label: "Zero Tax Items", value: "4", color: "#d97706" },
        { label: "Pending Reviews", value: "0", color: "#9333ea" },
      ]}
      tableTitle="Tax Rules"
      tableRows={[
        { name: "Electronics", meta: "Standard category rate", value: "18% GST", extra: "Applied automatically" },
        { name: "Books", meta: "Reduced tax slab", value: "5% GST", extra: "Lower tax bracket" },
        { name: "Essentials", meta: "Tax exempt items", value: "0%", extra: "Exempt category" },
      ]}
    />
  );
}

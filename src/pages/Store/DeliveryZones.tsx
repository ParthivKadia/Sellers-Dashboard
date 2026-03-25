import StorePage from "./StorePage";

export default function DeliveryZones() {
  return (
    <StorePage
      title="Delivery Zones"
      subtitle="Configure serviceable regions, shipping coverage, and delivery priority areas"
      stats={[
        { label: "Active Zones", value: "24", subtext: "Cities and regions served", color: "#2563eb", bg: "#eff6ff", icon: "📍" },
        { label: "Priority Zones", value: "6", subtext: "Fastest delivery areas", color: "#16a34a", bg: "#f0fdf4", icon: "⚡" },
        { label: "Restricted Zones", value: "3", subtext: "Unavailable regions", color: "#dc2626", bg: "#fef2f2", icon: "⛔" },
        { label: "Coverage Rate", value: "82%", subtext: "Target regions covered", color: "#9333ea", bg: "#faf5ff", icon: "🗺" },
      ]}
      chartTitle="Zone Coverage Growth"
      chartBars={[12, 15, 18, 20, 22, 24]}
      chartLabels={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]}
      sideTitle="Zone Insights"
      sideItems={[
        { label: "Top Zone", value: "Mumbai Metro", color: "#2563eb" },
        { label: "Fastest Delivery", value: "Same day", color: "#16a34a" },
        { label: "Restricted Areas", value: "3", color: "#dc2626" },
        { label: "Expansion Planned", value: "2 zones", color: "#d97706" },
      ]}
      tableTitle="Delivery Coverage"
      tableRows={[
        { name: "Mumbai Metro", meta: "Premium service zone", value: "Same day", extra: "Highest order volume" },
        { name: "Delhi NCR", meta: "Standard fast delivery", value: "1-2 days", extra: "Strong demand" },
        { name: "Tier-2 Cities", meta: "Expanded regions", value: "3-5 days", extra: "Growing steadily" },
      ]}
    />
  );
}

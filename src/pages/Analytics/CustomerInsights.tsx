import { type CSSProperties } from "react";

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
    <div style={{ padding: "28px", background: "#f8fafc", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#0f172a" }}>Customer Insights</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#64748b" }}>
          Understand growth, loyalty, city performance, and customer behavior
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {segmentation.map((item) => (
          <div key={item.label} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{item.label}</span>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                {item.icon}
              </div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: item.color }}>{item.value}</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>{item.subtext}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>Top Cities</h3>
            <span style={pillStyle}>By customers</span>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {topCities.map((item) => (
              <div key={item.city}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{item.city}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{item.customers} customers</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb" }}>{item.revenue}</div>
                </div>
                <div style={{ height: 10, background: "#e2e8f0", borderRadius: 999 }}>
                  <div
                    style={{
                      width: item.width,
                      height: "100%",
                      borderRadius: 999,
                      background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>Repeat vs New</h3>
            <span style={pillStyle}>Current month</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8 }}>
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                background:
                  "conic-gradient(#16a34a 0deg 235deg, #2563eb 235deg 330deg, #e2e8f0 330deg 360deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 700, color: "#0f172a" }}>842</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>customers</div>
              </div>
            </div>

            <div style={{ width: "100%", display: "grid", gap: 10 }}>
              <div style={legendRowStyle}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#16a34a" }} />
                  <span style={{ fontSize: 14, color: "#475569" }}>Repeat Customers</span>
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>65%</span>
              </div>

              <div style={legendRowStyle}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2563eb" }} />
                  <span style={{ fontSize: 14, color: "#475569" }}>New Customers</span>
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#2563eb" }}>26%</span>
              </div>

              <div style={legendRowStyle}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e2e8f0" }} />
                  <span style={{ fontSize: 14, color: "#475569" }}>Inactive</span>
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#64748b" }}>9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>Recent Customer Activity</h3>
          <span style={pillStyle}>Live insights</span>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {activities.map((item) => (
            <div key={`${item.name}-${item.action}`} style={activityRowStyle}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{item.name}</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{item.action}</div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb" }}>{item.value}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{item.time}</div>
              </div>

              <div>
                <span style={tagStyle}>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cardStyle: CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: 20,
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  color: "#0f172a",
};

const pillStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  padding: "6px 10px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#2563eb",
};

const legendRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const activityRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.5fr 1fr auto",
  alignItems: "center",
  gap: 16,
  padding: "14px 0",
  borderBottom: "1px solid #f1f5f9",
};

const tagStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  padding: "6px 10px",
  borderRadius: 999,
  background: "#f8fafc",
  color: "#475569",
};

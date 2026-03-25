import { useMemo, useState, type CSSProperties } from "react";

type CustomerType = "New" | "Repeat" | "VIP";
type RatingLevel = "Excellent" | "Good" | "Average" | "Low";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  spent: number;
  lastOrder: string;
  type: CustomerType;
  rating: number;
  ratingLevel: RatingLevel;
  status: "Active" | "Inactive";
};

type CustomersListPageProps = {
  title: string;
  subtitle: string;
  defaultFilter: "All" | "New" | "Repeat" | "Ratings";
};

const customers: Customer[] = [
  { id: 1, name: "Aarav Sharma", email: "aarav@gmail.com", phone: "+91 98765 11111", city: "Delhi", orders: 3, spent: 8499, lastOrder: "26 Mar 2026", type: "New", rating: 4.8, ratingLevel: "Excellent", status: "Active" },
  { id: 2, name: "Priya Mehta", email: "priya@gmail.com", phone: "+91 98765 22222", city: "Mumbai", orders: 12, spent: 22499, lastOrder: "24 Mar 2026", type: "Repeat", rating: 4.6, ratingLevel: "Excellent", status: "Active" },
  { id: 3, name: "Kabir Singh", email: "kabir@gmail.com", phone: "+91 98765 33333", city: "Jaipur", orders: 8, spent: 16399, lastOrder: "22 Mar 2026", type: "Repeat", rating: 4.2, ratingLevel: "Good", status: "Active" },
  { id: 4, name: "Sneha Kapoor", email: "sneha@gmail.com", phone: "+91 98765 44444", city: "Bengaluru", orders: 1, spent: 4999, lastOrder: "21 Mar 2026", type: "New", rating: 4.9, ratingLevel: "Excellent", status: "Active" },
  { id: 5, name: "Rohan Verma", email: "rohan@gmail.com", phone: "+91 98765 55555", city: "Pune", orders: 5, spent: 9999, lastOrder: "20 Mar 2026", type: "Repeat", rating: 3.9, ratingLevel: "Average", status: "Active" },
  { id: 6, name: "Ananya Rao", email: "ananya@gmail.com", phone: "+91 98765 66666", city: "Hyderabad", orders: 15, spent: 28999, lastOrder: "19 Mar 2026", type: "VIP", rating: 4.7, ratingLevel: "Excellent", status: "Active" },
  { id: 7, name: "Neel Joshi", email: "neel@gmail.com", phone: "+91 98765 77777", city: "Surat", orders: 2, spent: 2199, lastOrder: "17 Mar 2026", type: "New", rating: 3.7, ratingLevel: "Average", status: "Inactive" },
  { id: 8, name: "Diya Nair", email: "diya@gmail.com", phone: "+91 98765 88888", city: "Chennai", orders: 9, spent: 18499, lastOrder: "16 Mar 2026", type: "Repeat", rating: 4.4, ratingLevel: "Good", status: "Active" },
];

const typeBadge: Record<CustomerType, { bg: string; color: string }> = {
  New: { bg: "#eff6ff", color: "#2563eb" },
  Repeat: { bg: "#f0fdf4", color: "#16a34a" },
  VIP: { bg: "#faf5ff", color: "#9333ea" },
};

const ratingBadge: Record<RatingLevel, { bg: string; color: string }> = {
  Excellent: { bg: "#f0fdf4", color: "#16a34a" },
  Good: { bg: "#eff6ff", color: "#2563eb" },
  Average: { bg: "#fffbeb", color: "#d97706" },
  Low: { bg: "#fef2f2", color: "#dc2626" },
};

export default function CustomersListPage({
  title,
  subtitle,
  defaultFilter,
}: CustomersListPageProps) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.city.toLowerCase().includes(search.toLowerCase());

      if (defaultFilter === "New") return matchesSearch && customer.type === "New";
      if (defaultFilter === "Repeat") return matchesSearch && (customer.type === "Repeat" || customer.type === "VIP");
      if (defaultFilter === "Ratings") return matchesSearch && customer.rating >= 4;
      return matchesSearch;
    });
  }, [search, defaultFilter]);

  const stats = [
    {
      label: "Total Customers",
      value: filteredCustomers.length,
      color: "#2563eb",
      bg: "#eff6ff",
      icon: "👥",
    },
    {
      label: "New This Month",
      value: filteredCustomers.filter((c) => c.type === "New").length,
      color: "#16a34a",
      bg: "#f0fdf4",
      icon: "🆕",
    },
    {
      label: "Repeat Customers",
      value: filteredCustomers.filter((c) => c.type === "Repeat" || c.type === "VIP").length,
      color: "#9333ea",
      bg: "#faf5ff",
      icon: "🔁",
    },
    {
      label: "Avg Rating",
      value: (
        filteredCustomers.reduce((sum, c) => sum + c.rating, 0) /
          (filteredCustomers.length || 1)
      ).toFixed(1),
      color: "#d97706",
      bg: "#fffbeb",
      icon: "⭐",
    },
  ];

  return (
    <div style={{ padding: "28px", background: "#f8fafc", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{title}</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>{subtitle}</p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button style={secondaryButtonStyle}>Export</button>
          <button style={primaryButtonStyle}>+ Add Customer</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {stats.map((stat) => (
          <div key={stat.label} style={statCardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>{stat.label}</span>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {stat.icon}
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={filterBarStyle}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer, email or city..."
          style={inputStyle}
        />
      </div>

      <div style={tableCardStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["Customer", "Phone", "City", "Orders", "Spent", "Type", "Rating", "Status", "Last Order"].map((head) => (
                <th
                  key={head}
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                <td style={tdStyle}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{customer.name}</div>
                    <div style={{ fontSize: "12px", color: "#94a3b8" }}>{customer.email}</div>
                  </div>
                </td>
                <td style={tdStyle}>{customer.phone}</td>
                <td style={tdStyle}>{customer.city}</td>
                <td style={tdStyle}>{customer.orders}</td>
                <td style={{ ...tdStyle, fontWeight: 700, color: "#2563eb" }}>₹{customer.spent.toLocaleString()}</td>
                <td style={tdStyle}>
                  <span style={{ background: typeBadge[customer.type].bg, color: typeBadge[customer.type].color, padding: "5px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700 }}>
                    {customer.type}
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ background: ratingBadge[customer.ratingLevel].bg, color: ratingBadge[customer.ratingLevel].color, padding: "5px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700 }}>
                    {customer.rating} ★
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ color: customer.status === "Active" ? "#16a34a" : "#dc2626", fontWeight: 700 }}>
                    {customer.status}
                  </span>
                </td>
                <td style={tdStyle}>{customer.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCustomers.length === 0 && (
          <div style={{ padding: "56px", textAlign: "center", color: "#94a3b8" }}>
            <div style={{ fontSize: "42px", marginBottom: "10px" }}>👥</div>
            <div style={{ fontSize: "16px", fontWeight: 700 }}>No customers found</div>
          </div>
        )}
      </div>
    </div>
  );
}

const primaryButtonStyle: CSSProperties = {
  padding: "10px 18px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "#fff",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

const secondaryButtonStyle: CSSProperties = {
  padding: "10px 16px",
  borderRadius: "10px",
  border: "1.5px solid #e2e8f0",
  background: "#fff",
  color: "#374151",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
};

const statCardStyle: CSSProperties = {
  background: "#fff",
  borderRadius: "14px",
  padding: "20px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const filterBarStyle: CSSProperties = {
  background: "#fff",
  borderRadius: "14px",
  padding: "16px 20px",
  border: "1px solid #f1f5f9",
  marginBottom: "20px",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "9px",
  border: "1.5px solid #e2e8f0",
  fontSize: "13px",
  color: "#374151",
  outline: "none",
  background: "#f8fafc",
  boxSizing: "border-box",
};

const tableCardStyle: CSSProperties = {
  background: "#fff",
  borderRadius: "14px",
  border: "1px solid #f1f5f9",
  overflow: "hidden",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const tdStyle: CSSProperties = {
  padding: "14px 16px",
  fontSize: "13px",
  color: "#64748b",
};

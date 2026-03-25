import { type CSSProperties } from "react";

type Stat = {
  label: string;
  value: string;
  subtext: string;
  color: string;
  bg: string;
  icon: string;
};

type SideItem = {
  label: string;
  value: string;
  color: string;
};

type Row = {
  name: string;
  meta: string;
  value: string;
  extra: string;
};

type SettingsPageProps = {
  title: string;
  subtitle: string;
  stats: Stat[];
  sideTitle: string;
  sideItems: SideItem[];
  tableTitle: string;
  tableRows: Row[];
};

export default function SettingsPage({
  title,
  subtitle,
  stats,
  sideTitle,
  sideItems,
  tableTitle,
  tableRows,
}: SettingsPageProps) {
  return (
    <div style={pageStyle}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#0f172a" }}>{title}</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#64748b" }}>{subtitle}</p>
      </div>

      <div style={responsiveGrid4}>
        {stats.map((item) => (
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
            <div style={{ fontSize: 28, fontWeight: 700, color: item.color }}>{item.value}</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>{item.subtext}</div>
          </div>
        ))}
      </div>

      <div style={responsiveGrid2}>
        <div style={cardStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>{sideTitle}</h3>
            <span style={pillStyle}>Overview</span>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {sideItems.map((item) => (
              <div key={item.label} style={infoRowStyle}>
                <span style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>{tableTitle}</h3>
            <span style={pillStyle}>Details</span>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {tableRows.map((row) => (
              <div key={row.name} style={detailRowStyle}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{row.name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{row.meta}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#2563eb" }}>{row.value}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{row.extra}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const pageStyle: CSSProperties = {
  padding: "clamp(16px, 3vw, 28px)",
  background: "#f8fafc",
  minHeight: "100vh",
  fontFamily: "'DM Sans', sans-serif",
};

const responsiveGrid4: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const responsiveGrid2: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 16,
};

const cardStyle: CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: 20,
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  minWidth: 0,
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 16,
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

const infoRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "12px 0",
  borderBottom: "1px solid #f1f5f9",
};

const detailRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "12px 0",
  borderBottom: "1px solid #f1f5f9",
};

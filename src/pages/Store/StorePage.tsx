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

type StorePageProps = {
  title: string;
  subtitle: string;
  stats: Stat[];
  chartTitle: string;
  chartBars: number[];
  chartLabels: string[];
  sideTitle: string;
  sideItems: SideItem[];
  tableTitle: string;
  tableRows: Row[];
};

export default function StorePage({
  title,
  subtitle,
  stats,
  chartTitle,
  chartBars,
  chartLabels,
  sideTitle,
  sideItems,
  tableTitle,
  tableRows,
}: StorePageProps) {
  return (
    <div style={{ padding: "28px", background: "#f8fafc", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#0f172a" }}>{title}</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#64748b" }}>{subtitle}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>{chartTitle}</h3>
            <span style={pillStyle}>Overview</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: `repeat(${chartBars.length}, 1fr)`, gap: 12, alignItems: "end", height: 240, paddingTop: 16 }}>
            {chartBars.map((value, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: `${value * 2.2}px`,
                    background: "linear-gradient(180deg, #3b82f6, #1d4ed8)",
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
                <div style={{ fontSize: 12, color: "#64748b" }}>{chartLabels[index]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>{sideTitle}</h3>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {sideItems.map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: 17, fontWeight: 700, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>{tableTitle}</h3>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {tableRows.map((row) => (
            <div key={row.name} style={rowStyle}>
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

const rowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid #f1f5f9",
};

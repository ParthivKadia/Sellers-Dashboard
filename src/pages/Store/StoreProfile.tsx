import { useState, type CSSProperties } from "react";

type StoreProfileData = {
  storeName: string;
  businessCategory: string;
  supportEmail: string;
  phone: string;
  website: string;
  gstNumber: string;
  address: string;
  description: string;
  startYear: string;
};

const initialProfile: StoreProfileData = {
  storeName: "Storly",
  businessCategory: "Lifestyle & Electronics",
  supportEmail: "support@storly.com",
  phone: "+91 98765 43210",
  website: "www.storly.com",
  gstNumber: "27ABCDE1234F1Z5",
  address: "Mumbai, Maharashtra, India",
  description:
    "Storly is a modern ecommerce seller brand focused on electronics, fashion, and everyday lifestyle essentials.",
  startYear: "2023",
};

export default function StoreProfile() {
  const [profile, setProfile] = useState<StoreProfileData>(initialProfile);
  const [draft, setDraft] = useState<StoreProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const storeAgeYears = Math.max(0, new Date().getFullYear() - Number(profile.startYear));

  const stats = [
    {
      label: "Store Rating",
      value: "4.8",
      subtext: "Average customer rating",
      color: "#2563eb",
      bg: "#eff6ff",
      icon: "⭐",
    },
    {
      label: "Products Live",
      value: "126",
      subtext: "Active listings",
      color: "#16a34a",
      bg: "#f0fdf4",
      icon: "🛍",
    },
    {
      label: "Profile Views",
      value: "18.4K",
      subtext: "Monthly visitors",
      color: "#d97706",
      bg: "#fffbeb",
      icon: "👁",
    },
    {
      label: "Store Age",
      value: `${storeAgeYears} yrs`,
      subtext: `Started in ${profile.startYear}`,
      color: "#9333ea",
      bg: "#faf5ff",
      icon: "🏪",
    },
  ];

  const handleChange = (field: keyof StoreProfileData, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(draft);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        padding: "28px",
        background: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#0f172a" }}>
            Store Profile
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "#64748b" }}>
            Manage your storefront identity, business information, and brand details
          </p>
        </div>

        {!isEditing ? (
          <button style={primaryButtonStyle} onClick={handleEdit}>
            Edit Profile
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <button style={secondaryButtonStyle} onClick={handleCancel}>
              Cancel
            </button>
            <button style={primaryButtonStyle} onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {stats.map((item) => (
          <div key={item.label} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
                {item.label}
              </span>
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

      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>Business Information</h3>
          <span style={pillStyle}>{isEditing ? "Editing" : "Profile Overview"}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
          <Field
            label="Store Name"
            value={isEditing ? draft.storeName : profile.storeName}
            editing={isEditing}
            onChange={(value) => handleChange("storeName", value)}
          />
          <Field
            label="Business Category"
            value={isEditing ? draft.businessCategory : profile.businessCategory}
            editing={isEditing}
            onChange={(value) => handleChange("businessCategory", value)}
          />
          <Field
            label="Support Email"
            value={isEditing ? draft.supportEmail : profile.supportEmail}
            editing={isEditing}
            onChange={(value) => handleChange("supportEmail", value)}
          />
          <Field
            label="Phone"
            value={isEditing ? draft.phone : profile.phone}
            editing={isEditing}
            onChange={(value) => handleChange("phone", value)}
          />
          <Field
            label="Website"
            value={isEditing ? draft.website : profile.website}
            editing={isEditing}
            onChange={(value) => handleChange("website", value)}
          />
          <Field
            label="GST Number"
            value={isEditing ? draft.gstNumber : profile.gstNumber}
            editing={isEditing}
            onChange={(value) => handleChange("gstNumber", value)}
          />
          <Field
            label="Start Year"
            value={isEditing ? draft.startYear : profile.startYear}
            editing={isEditing}
            onChange={(value) => handleChange("startYear", value)}
          />
        </div>

        <div style={{ marginTop: 18 }}>
          <Field
            label="Business Address"
            value={isEditing ? draft.address : profile.address}
            editing={isEditing}
            onChange={(value) => handleChange("address", value)}
          />
        </div>

        <div style={{ marginTop: 18 }}>
          <label style={labelStyle}>Store Description</label>
          {isEditing ? (
            <textarea
              value={draft.description}
              onChange={(e) => handleChange("description", e.target.value)}
              style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
            />
          ) : (
            <div style={readOnlyBlockStyle}>{profile.description}</div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
        <div style={cardStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>Brand Summary</h3>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <InfoRow label="Public Store Name" value={profile.storeName} />
            <InfoRow label="Primary Category" value={profile.businessCategory} />
            <InfoRow label="Support Contact" value={profile.supportEmail} />
            <InfoRow label="Business Phone" value={profile.phone} />
            <InfoRow label="Website" value={profile.website} />
            <InfoRow label="Store Age" value={`${storeAgeYears} years`} />
          </div>
        </div>

        <div style={cardStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>Store Health</h3>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <InfoRow label="Verification Status" value="Verified" valueColor="#16a34a" />
            <InfoRow label="Catalog Status" value="Healthy" valueColor="#2563eb" />
            <InfoRow label="Customer Trust Score" value="High" valueColor="#d97706" />
            <InfoRow label="Seller Tier" value="Gold" valueColor="#9333ea" />
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
};

function Field({ label, value, editing, onChange }: FieldProps) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {editing ? (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      ) : (
        <div style={readOnlyStyle}>{value}</div>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  valueColor = "#0f172a",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div style={infoRowStyle}>
      <span style={{ fontSize: 14, color: "#64748b" }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: valueColor }}>{value}</span>
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

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontSize: 13,
  fontWeight: 600,
  color: "#475569",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "11px 12px",
  borderRadius: 10,
  border: "1.5px solid #dbe3ef",
  fontSize: 14,
  color: "#0f172a",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};

const readOnlyStyle: CSSProperties = {
  padding: "11px 12px",
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  color: "#0f172a",
  background: "#f8fafc",
};

const readOnlyBlockStyle: CSSProperties = {
  padding: "14px 12px",
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  lineHeight: 1.6,
  color: "#0f172a",
  background: "#f8fafc",
};

const infoRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid #f1f5f9",
};

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

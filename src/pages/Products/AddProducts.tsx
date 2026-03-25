// FILE: src/pages/Products/AddProduct.tsx
// PASTE: Create this new file at src/pages/Products/AddProduct.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Beauty', 'Sports', 'Toys', 'Automotive'];
const conditions = ['New', 'Refurbished', 'Used - Like New', 'Used - Good'];

interface FormData {
  name: string; sku: string; category: string; price: string; mrp: string;
  stock: string; minStock: string; description: string; brand: string;
  weight: string; condition: string; tags: string; hsn: string; gst: string;
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'inventory' | 'shipping'>('basic');
  const [dragOver, setDragOver] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', sku: '', category: '', price: '', mrp: '', stock: '', minStock: '',
    description: '', brand: '', weight: '', condition: 'New', tags: '', hsn: '', gst: '18'
  });

  const update = (field: keyof FormData, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); navigate('/products'); }, 1500);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'pricing', label: 'Pricing & Tax', icon: '💰' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'shipping', label: 'Shipping', icon: '🚚' },
  ] as const;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
    outline: 'none', boxSizing: 'border-box', background: '#fff',
    transition: 'border-color 0.15s',
  };
  const labelStyle: React.CSSProperties = {
    fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block'
  };

  const discount = form.mrp && form.price ? Math.round((1 - Number(form.price) / Number(form.mrp)) * 100) : 0;

  return (
    <div style={{ padding: '28px', background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => navigate('/products')} style={{
            width: '38px', height: '38px', borderRadius: '10px', border: '1.5px solid #e2e8f0',
            background: '#fff', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>←</button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Add New Product</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0' }}>Fill in the details to list a new product</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{
            padding: '10px 18px', borderRadius: '10px', border: '1.5px solid #e2e8f0',
            background: '#fff', color: '#374151', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
          }}>Save Draft</button>
          <button onClick={handleSave} style={{
            padding: '10px 22px', borderRadius: '10px', border: 'none',
            background: saving ? '#94a3b8' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(37,99,235,0.35)', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            {saving ? '⏳ Publishing...' : '🚀 Publish Product'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>

        {/* LEFT: Main Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', background: '#fff', padding: '6px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: 1, padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: activeTab === tab.id ? '#2563eb' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#64748b',
                fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}>
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* BASIC INFO TAB */}
          {activeTab === 'basic' && (
            <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '20px' }}>Product Information</h2>
              <div style={{ display: 'grid', gap: '18px' }}>
                <div>
                  <label style={labelStyle}>Product Name *</label>
                  <input value={form.name} onChange={e => update('name', e.target.value)}
                    placeholder="e.g. Wireless Bluetooth Earbuds Pro" style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Brand</label>
                    <input value={form.brand} onChange={e => update('brand', e.target.value)}
                      placeholder="e.g. Sony, Nike..." style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Category *</label>
                    <select value={form.category} onChange={e => update('category', e.target.value)} style={inputStyle}>
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>SKU *</label>
                    <input value={form.sku} onChange={e => update('sku', e.target.value)}
                      placeholder="e.g. WEP-001" style={{ ...inputStyle, fontFamily: 'monospace' }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Condition</label>
                    <select value={form.condition} onChange={e => update('condition', e.target.value)} style={inputStyle}>
                      {conditions.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea value={form.description} onChange={e => update('description', e.target.value)}
                    placeholder="Describe your product in detail... features, specifications, what's in the box"
                    rows={5} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
                <div>
                  <label style={labelStyle}>Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => update('tags', e.target.value)}
                    placeholder="wireless, earbuds, bluetooth, noise-cancelling" style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {/* PRICING TAB */}
          {activeTab === 'pricing' && (
            <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '20px' }}>Pricing & Tax Details</h2>
              <div style={{ display: 'grid', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Selling Price (₹) *</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontWeight: 700 }}>₹</span>
                      <input value={form.price} onChange={e => update('price', e.target.value)}
                        placeholder="0.00" type="number" style={{ ...inputStyle, paddingLeft: '28px' }} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>MRP / Original Price (₹)</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontWeight: 700 }}>₹</span>
                      <input value={form.mrp} onChange={e => update('mrp', e.target.value)}
                        placeholder="0.00" type="number" style={{ ...inputStyle, paddingLeft: '28px' }} />
                    </div>
                  </div>
                </div>

                {discount > 0 && (
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '22px' }}>🎉</span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#16a34a' }}>{discount}% OFF</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>Customers save ₹{(Number(form.mrp) - Number(form.price)).toLocaleString()}</div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>HSN Code</label>
                    <input value={form.hsn} onChange={e => update('hsn', e.target.value)}
                      placeholder="e.g. 8518" style={{ ...inputStyle, fontFamily: 'monospace' }} />
                  </div>
                  <div>
                    <label style={labelStyle}>GST Rate (%)</label>
                    <select value={form.gst} onChange={e => update('gst', e.target.value)} style={inputStyle}>
                      {['0', '5', '12', '18', '28'].map(g => <option key={g} value={g}>{g}%</option>)}
                    </select>
                  </div>
                </div>

                {form.price && (
                  <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>Price Breakdown</div>
                    {[
                      { label: 'Base Price', value: `₹${(Number(form.price) / (1 + Number(form.gst) / 100)).toFixed(2)}` },
                      { label: `GST (${form.gst}%)`, value: `₹${(Number(form.price) - Number(form.price) / (1 + Number(form.gst) / 100)).toFixed(2)}` },
                      { label: 'Selling Price', value: `₹${Number(form.price).toLocaleString()}`, bold: true },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>{row.label}</span>
                        <span style={{ fontSize: '13px', fontWeight: row.bold ? 700 : 500, color: row.bold ? '#0f172a' : '#374151' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* INVENTORY TAB */}
          {activeTab === 'inventory' && (
            <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '20px' }}>Inventory Management</h2>
              <div style={{ display: 'grid', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Available Stock *</label>
                    <input value={form.stock} onChange={e => update('stock', e.target.value)}
                      placeholder="0" type="number" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Min Stock Alert</label>
                    <input value={form.minStock} onChange={e => update('minStock', e.target.value)}
                      placeholder="e.g. 10" type="number" style={inputStyle} />
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Alert when stock falls below this</div>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Product Weight (grams)</label>
                  <input value={form.weight} onChange={e => update('weight', e.target.value)}
                    placeholder="e.g. 250" type="number" style={inputStyle} />
                </div>
                <div style={{ background: '#fffbeb', borderRadius: '10px', padding: '14px 18px', border: '1px solid #fde68a' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#92400e', marginBottom: '6px' }}>📋 Stock Status Preview</div>
                  <div style={{ fontSize: '13px', color: '#78350f' }}>
                    {!form.stock ? 'Enter stock quantity above' :
                      Number(form.stock) === 0 ? '❌ Out of Stock' :
                        Number(form.stock) <= Number(form.minStock || 10) ? '⚠️ Will be marked as Low Stock' :
                          '✅ Will be marked as Active'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SHIPPING TAB */}
          {activeTab === 'shipping' && (
            <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '20px' }}>Shipping Details</h2>
              <div style={{ display: 'grid', gap: '18px' }}>
                {[
                  { label: 'Length (cm)', placeholder: '0' },
                  { label: 'Width (cm)', placeholder: '0' },
                  { label: 'Height (cm)', placeholder: '0' },
                ].map(({ label, placeholder }) => (
                  <div key={label}>
                    <label style={labelStyle}>{label}</label>
                    <input placeholder={placeholder} type="number" style={inputStyle} />
                  </div>
                ))}
                <div>
                  <label style={labelStyle}>Shipping Class</label>
                  <select style={inputStyle}>
                    <option>Standard (5-7 days)</option>
                    <option>Express (2-3 days)</option>
                    <option>Same Day</option>
                    <option>Fragile / Special Handling</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <input type="checkbox" id="freeShip" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                  <label htmlFor="freeShip" style={{ fontSize: '14px', fontWeight: 500, color: '#166534', cursor: 'pointer' }}>
                    🚚 Offer Free Shipping on this product
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Image Upload + Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Image Upload */}
          <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '14px' }}>Product Images</h3>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); }}
              style={{
                border: `2px dashed ${dragOver ? '#2563eb' : '#e2e8f0'}`,
                borderRadius: '12px', padding: '32px 20px', textAlign: 'center',
                background: dragOver ? '#eff6ff' : '#f8fafc', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>🖼️</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Drop images here</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '14px' }}>PNG, JPG up to 5MB each</div>
              <button style={{
                background: '#eff6ff', color: '#2563eb', border: '1.5px solid #bfdbfe',
                borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: 600
              }}>Browse Files</button>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '10px', textAlign: 'center' }}>
              First image will be the main product photo
            </div>
          </div>

          {/* Publish Settings */}
          <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '14px' }}>Publish Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Status', options: ['Active', 'Draft', 'Scheduled'] },
                { label: 'Visibility', options: ['Public', 'Private', 'Password Protected'] },
              ].map(({ label, options }) => (
                <div key={label}>
                  <label style={{ ...labelStyle, marginBottom: '4px' }}>{label}</label>
                  <select style={inputStyle}>
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '14px' }}>Listing Checklist</h3>
            {[
              { label: 'Product name', done: !!form.name },
              { label: 'Category selected', done: !!form.category },
              { label: 'SKU added', done: !!form.sku },
              { label: 'Selling price set', done: !!form.price },
              { label: 'Stock quantity', done: !!form.stock },
              { label: 'Description written', done: !!form.description },
            ].map(({ label, done }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ fontSize: '14px' }}>{done ? '✅' : '⬜'}</span>
                <span style={{ fontSize: '13px', color: done ? '#16a34a' : '#94a3b8', fontWeight: done ? 600 : 400, textDecoration: done ? 'none' : 'none' }}>{label}</span>
              </div>
            ))}
            <div style={{ marginTop: '12px', background: '#f8fafc', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '8px',
                background: 'linear-gradient(90deg, #2563eb, #22c55e)',
                width: `${([!!form.name, !!form.category, !!form.sku, !!form.price, !!form.stock, !!form.description].filter(Boolean).length / 6) * 100}%`,
                transition: 'width 0.4s'
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
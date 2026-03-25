import { useMemo, useState, type CSSProperties } from 'react';

type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

type PaymentStatus = 'Paid' | 'Pending' | 'Refunded' | 'Failed';

type Order = {
  id: number;
  orderId: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  date: string;
  city: string;
};

type OrdersListPageProps = {
  title: string;
  subtitle: string;
  defaultStatus: 'All' | OrderStatus;
};

const orders: Order[] = [
  { id: 1, orderId: 'ORD-1001', customer: 'Aarav Sharma', email: 'aarav@gmail.com', items: 3, total: 2499, paymentStatus: 'Paid', status: 'Pending', date: '26 Mar 2026', city: 'Delhi' },
  { id: 2, orderId: 'ORD-1002', customer: 'Priya Mehta', email: 'priya@gmail.com', items: 2, total: 1599, paymentStatus: 'Paid', status: 'Processing', date: '25 Mar 2026', city: 'Mumbai' },
  { id: 3, orderId: 'ORD-1003', customer: 'Rohan Verma', email: 'rohan@gmail.com', items: 1, total: 899, paymentStatus: 'Pending', status: 'Pending', date: '25 Mar 2026', city: 'Pune' },
  { id: 4, orderId: 'ORD-1004', customer: 'Sneha Kapoor', email: 'sneha@gmail.com', items: 4, total: 4999, paymentStatus: 'Paid', status: 'Shipped', date: '24 Mar 2026', city: 'Bengaluru' },
  { id: 5, orderId: 'ORD-1005', customer: 'Kabir Singh', email: 'kabir@gmail.com', items: 2, total: 3299, paymentStatus: 'Paid', status: 'Delivered', date: '23 Mar 2026', city: 'Jaipur' },
  { id: 6, orderId: 'ORD-1006', customer: 'Ananya Rao', email: 'ananya@gmail.com', items: 1, total: 549, paymentStatus: 'Refunded', status: 'Returned', date: '22 Mar 2026', city: 'Hyderabad' },
  { id: 7, orderId: 'ORD-1007', customer: 'Vikram Das', email: 'vikram@gmail.com', items: 5, total: 7199, paymentStatus: 'Failed', status: 'Cancelled', date: '21 Mar 2026', city: 'Kolkata' },
  { id: 8, orderId: 'ORD-1008', customer: 'Isha Patel', email: 'isha@gmail.com', items: 2, total: 1899, paymentStatus: 'Paid', status: 'Shipped', date: '20 Mar 2026', city: 'Ahmedabad' },
  { id: 9, orderId: 'ORD-1009', customer: 'Neel Joshi', email: 'neel@gmail.com', items: 3, total: 2799, paymentStatus: 'Paid', status: 'Delivered', date: '19 Mar 2026', city: 'Surat' },
  { id: 10, orderId: 'ORD-1010', customer: 'Diya Nair', email: 'diya@gmail.com', items: 1, total: 1299, paymentStatus: 'Pending', status: 'Processing', date: '18 Mar 2026', city: 'Chennai' },
];

const orderStatusConfig: Record<OrderStatus, { bg: string; color: string; dot: string }> = {
  Pending: { bg: '#fff7ed', color: '#ea580c', dot: '#f97316' },
  Processing: { bg: '#eff6ff', color: '#2563eb', dot: '#3b82f6' },
  Shipped: { bg: '#ecfeff', color: '#0891b2', dot: '#06b6d4' },
  Delivered: { bg: '#f0fdf4', color: '#16a34a', dot: '#22c55e' },
  Cancelled: { bg: '#fef2f2', color: '#dc2626', dot: '#ef4444' },
  Returned: { bg: '#faf5ff', color: '#9333ea', dot: '#a855f7' },
};

const paymentStatusConfig: Record<PaymentStatus, { bg: string; color: string }> = {
  Paid: { bg: '#f0fdf4', color: '#16a34a' },
  Pending: { bg: '#fffbeb', color: '#d97706' },
  Refunded: { bg: '#eff6ff', color: '#2563eb' },
  Failed: { bg: '#fef2f2', color: '#dc2626' },
};

export default function OrdersListPage({
  title,
  subtitle,
  defaultStatus,
}: OrdersListPageProps) {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | OrderStatus>(defaultStatus);
  const [selectedPayment, setSelectedPayment] = useState<'All' | PaymentStatus>('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
      const matchesPayment = selectedPayment === 'All' || order.paymentStatus === selectedPayment;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [search, selectedStatus, selectedPayment]);

  const stats = [
    {
      label: 'Total Orders',
      value: filteredOrders.length,
      color: '#2563eb',
      bg: '#eff6ff',
      icon: '📦',
    },
    {
      label: 'Revenue',
      value: `₹${filteredOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}`,
      color: '#16a34a',
      bg: '#f0fdf4',
      icon: '💰',
    },
    {
      label: 'Paid Orders',
      value: filteredOrders.filter((order) => order.paymentStatus === 'Paid').length,
      color: '#0891b2',
      bg: '#ecfeff',
      icon: '✅',
    },
    {
      label: 'Returns / Cancels',
      value: filteredOrders.filter((order) => order.status === 'Returned' || order.status === 'Cancelled').length,
      color: '#dc2626',
      bg: '#fef2f2',
      icon: '↩',
    },
  ];

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: '28px', background: '#f8fafc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{title}</h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>{subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={secondaryButtonStyle}>Export</button>
          <button style={primaryButtonStyle}>+ Create Order</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{stat.label}</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '16px 20px',
          border: '1px solid #f1f5f9',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search order ID, customer, email..."
          style={inputStyle}
        />

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as 'All' | OrderStatus)}
          style={selectStyle}
        >
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value as 'All' | PaymentStatus)}
          style={selectStyle}
        >
          {['All', 'Paid', 'Pending', 'Refunded', 'Failed'].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {selectedIds.length > 0 && (
        <div
          style={{
            background: '#1e40af',
            color: '#fff',
            borderRadius: '10px',
            padding: '12px 20px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{selectedIds.length} selected</span>
          <button style={bulkButtonStyle}>Mark Shipped</button>
          <button style={bulkButtonStyle}>Print Labels</button>
          <button
            onClick={() => setSelectedIds([])}
            style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' }}
          >
            ×
          </button>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '14px 16px', width: '40px' }}>
                <input
                  type="checkbox"
                  checked={filteredOrders.length > 0 && selectedIds.length === filteredOrders.length}
                  onChange={(e) => setSelectedIds(e.target.checked ? filteredOrders.map((order) => order.id) : [])}
                />
              </th>
              {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Payment', 'Status', 'City', 'Actions'].map((head) => (
                <th
                  key={head}
                  style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => {
              const orderBadge = orderStatusConfig[order.status];
              const paymentBadge = paymentStatusConfig[order.paymentStatus];

              return (
                <tr key={order.id} style={{ borderTop: '1px solid #f8fafc', background: selectedIds.includes(order.id) ? '#eff6ff' : 'transparent' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(order.id)}
                      onChange={() => toggleSelect(order.id)}
                    />
                  </td>

                  <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>
                    {order.orderId}
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{order.customer}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{order.email}</div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{order.date}</td>
                  <td style={{ padding: '14px 16px', fontSize: '14px', color: '#0f172a', fontWeight: 600 }}>{order.items}</td>
                  <td style={{ padding: '14px 16px', fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>₹{order.total.toLocaleString()}</td>

                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: paymentBadge.bg, color: paymentBadge.color, padding: '5px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: orderBadge.bg, color: orderBadge.color, padding: '5px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: orderBadge.dot, display: 'inline-block' }} />
                      {order.status}
                    </span>
                  </td>

                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{order.city}</td>

                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '7px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                        View
                      </button>
                      <button style={{ background: '#f8fafc', color: '#475569', border: 'none', borderRadius: '7px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div style={{ padding: '56px', textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: '42px', marginBottom: '10px' }}>📭</div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>No orders found</div>
            <div style={{ fontSize: '13px', marginTop: '6px' }}>Try changing your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
}

const primaryButtonStyle: CSSProperties = {
  padding: '10px 18px',
  borderRadius: '10px',
  border: 'none',
  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(37,99,235,0.35)',
};

const secondaryButtonStyle: CSSProperties = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1.5px solid #e2e8f0',
  background: '#fff',
  color: '#374151',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
};

const inputStyle: CSSProperties = {
  flex: 1,
  minWidth: '240px',
  padding: '10px 14px',
  borderRadius: '9px',
  border: '1.5px solid #e2e8f0',
  fontSize: '13px',
  color: '#374151',
  outline: 'none',
  background: '#f8fafc',
};

const selectStyle: CSSProperties = {
  padding: '10px 14px',
  borderRadius: '9px',
  border: '1.5px solid #e2e8f0',
  fontSize: '13px',
  color: '#374151',
  background: '#f8fafc',
  cursor: 'pointer',
};

const bulkButtonStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.18)',
  border: 'none',
  color: '#fff',
  padding: '6px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '13px',
};

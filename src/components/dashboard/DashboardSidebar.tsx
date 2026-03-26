// FILE: src/components/dashboard/DashboardSidebar.tsx
// REPLACE entire file — keeps all your existing menu items + Tailwind classes
// Adds: isOpen/onClose props, backdrop, X button, slide animation

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Settings, ChevronDown, ChevronRight, Zap,
  Package, Trophy, AlertTriangle, Truck, PackageCheck, XCircle,
  RotateCcw, PlusCircle, Grid, Boxes, Users, Star, MessageSquare,
  BarChart3, TrendingUp, TicketPercent, Megaphone, Percent, Store,
  Wallet, Bell, LogOut, ShoppingCart, ListTodo, Loader, UserPlus,
  Repeat, MessageSquareQuote, Mail, Receipt, MapPinned, ShieldCheck,
  Lock, X,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  path?: string;
  hasSubmenu?: boolean;
  children?: { label: string; path: string }[];
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

const menuItems: MenuSection[] = [
  {
    section: "HOME",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    ],
  },
  {
    section: "PRODUCTS",
    items: [
      { label: "All Products", icon: Package,       path: "/products"    },
      { label: "Add Product",  icon: PlusCircle,    path: "/add-product" },
      {
        label: "Categories", icon: Grid, path: "/categories",
        children: [
          { label: "📱 Electronics",   path: "/products/category/electronics"   },
          { label: "👕 Clothing",       path: "/products/category/clothing"       },
          { label: "🏠 Home & Kitchen", path: "/products/category/home-kitchen"  },
          { label: "📚 Books",          path: "/products/category/books"          },
          { label: "🧴 Beauty",         path: "/products/category/beauty"         },
        ],
      },
      { label: "Inventory", icon: Boxes,         path: "/inventory"  },
      { label: "Low Stock", icon: AlertTriangle,  path: "/low-stock"  },
    ],
  },
  {
    section: "ORDERS",
    items: [
      { label: "All Orders",        icon: ShoppingCart, path: "/orders"             },
      { label: "Pending Orders",    icon: ListTodo,     path: "/orders/pending"     },
      { label: "Processing Orders", icon: Loader,       path: "/orders/processing"  },
      { label: "Shipped Orders",    icon: Truck,        path: "/orders/shipped"     },
      { label: "Delivered Orders",  icon: PackageCheck, path: "/orders/delivered"   },
      { label: "Cancelled Orders",  icon: XCircle,      path: "/orders/cancelled"   },
      { label: "Returned Orders",   icon: RotateCcw,    path: "/orders/returned"    },
    ],
  },
  {
    section: "CUSTOMERS",
    items: [
      { label: "All Customers",    icon: Users,              path: "/customers"        },
      { label: "New Customers",    icon: UserPlus,           path: "/customers/new"    },
      { label: "Repeat Customers", icon: Repeat,             path: "/customers/repeat" },
      { label: "Customer Ratings", icon: Star,               path: "/customers/ratings"},
      { label: "Customer Reviews", icon: MessageSquareQuote, path: "/reviews"          },
      { label: "Messages",         icon: MessageSquare,      path: "/messages"         },
    ],
  },
  {
    section: "ANALYTICS",
    items: [
      { label: "Sales Analytics",   icon: BarChart3,  path: "/sales-analytics"   },
      { label: "Top Products",      icon: Trophy,     path: "/top-products"       },
      { label: "Revenue Report",    icon: TrendingUp, path: "/revenue"            },
      { label: "Customer Insights", icon: Users,      path: "/customer-insights"  },
    ],
  },
  {
    section: "MARKETING",
    items: [
      { label: "Coupons",         icon: TicketPercent, path: "/coupons"         },
      { label: "Campaigns",       icon: Megaphone,     path: "/campaigns"       },
      { label: "Discount",        icon: Percent,       path: "/discounts"       },
      { label: "Email Marketing", icon: Mail,          path: "/email-marketing" },
      { label: "Cart Recovery",   icon: ShoppingCart,  path: "/cart-recovery"   },
    ],
  },
  {
    section: "STORE",
    items: [
      { label: "Store Profile",  icon: Store,     path: "/store-profile"  },
      { label: "Shipping",       icon: Truck,     path: "/shipping"       },
      { label: "Payments",       icon: Wallet,    path: "/payments"       },
      { label: "Tax Settings",   icon: Receipt,   path: "/tax-settings"   },
      { label: "Delivery Zones", icon: MapPinned, path: "/delivery-zones" },
    ],
  },
  {
    section: "SETTINGS",
    items: [
      { label: "Account Settings",    icon: Settings,    path: "/settings"           },
      { label: "Notifications",       icon: Bell,        path: "/notifications"      },
      { label: "Roles & Permissions", icon: ShieldCheck, path: "/roles-permissions"  },
      { label: "Security",            icon: Lock,        path: "/security"           },
      { label: "Logout",              icon: LogOut,      path: "/logout"             },
    ],
  },
];

// ─── NEW props ────────────────────────────────────────────────────────────────
interface DashboardSidebarProps {
  isOpen: boolean;     // mobile drawer open/closed — controlled by DashboardLayout
  onClose: () => void; // close handler — called on backdrop click or X button
}

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const navigate  = useNavigate();
  const location  = useLocation();

  // Categories submenu open by default
  const [openSubmenus, setOpenSubmenus] = useState<string[]>(["Categories"]);

  const toggleSubmenu = (label: string) =>
    setOpenSubmenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  // Navigate and auto-close drawer on mobile
  const handleNav = (path?: string) => {
    if (!path) return;
    navigate(path);
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* ── Backdrop (mobile only, when drawer is open) ───────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar panel ────────────────────────────────────────────────────
          Desktop (lg+) : sticky in the normal flex flow, always visible.
          Mobile (<lg)  : fixed drawer, slides in from left when isOpen=true.
      ──────────────────────────────────────────────────────────────────────── */}
      <aside
        className={`
          w-[270px] bg-card border-r border-sidebar-border flex flex-col shrink-0 z-50
          transition-transform duration-300 ease-in-out

          lg:relative lg:sticky lg:top-0 lg:h-screen lg:translate-x-0

          fixed top-0 left-0 h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo + X button */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground flex-1">Seller Hub</span>

          {/* ✕ Only visible on mobile */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="lg:hidden w-7 h-7 rounded-md flex items-center justify-center
                       text-muted-foreground hover:bg-sidebar-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav — identical structure to your original code */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 pb-6">
          {menuItems.map((section) =>
            section.items.length === 0 ? null : (
              <div key={section.section} className="mb-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 pt-4 pb-2">
                  {section.section}
                </p>

                {section.items.map((item) => {
                  const Icon     = item.icon;
                  const isActive = item.path ? location.pathname === item.path : false;
                  const hasKids  = !!(item.children && item.children.length > 0);
                  const subOpen  = openSubmenus.includes(item.label);

                  return (
                    <div key={item.label}>
                      {/* Main nav button — same classes as your original */}
                      <button
                        onClick={() => hasKids ? toggleSubmenu(item.label) : handleNav(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                          isActive && !hasKids
                            ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }`}
                      >
                        <Icon className="w-[18px] h-[18px] shrink-0" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {hasKids && (
                          subOpen
                            ? <ChevronDown  className="w-4 h-4 text-muted-foreground" />
                            : <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>

                      {/* Category sub-items */}
                      {hasKids && subOpen && (
                        <div className="ml-4 border-l-2 border-sidebar-border pl-1 mb-1">
                          {item.children!.map((child) => {
                            const childActive = location.pathname === child.path;
                            return (
                              <button
                                key={child.path}
                                onClick={() => handleNav(child.path)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors mb-0.5 ${
                                  childActive
                                    ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  childActive ? "bg-sidebar-primary" : "bg-muted-foreground opacity-40"
                                }`} />
                                <span className="flex-1 text-left">{child.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          )}
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;

// FILE: src/components/dashboard/DashboardSidebar.tsx
// REPLACE entire file content with this

// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import type { LucideIcon } from "lucide-react";
// import {
//   LayoutDashboard, Settings, ChevronDown, ChevronRight, Zap,
//   Package, Trophy, AlertTriangle, Truck, PackageCheck, XCircle,
//   RotateCcw, PlusCircle, Grid, Boxes, Users, Star, MessageSquare,
//   BarChart3, TrendingUp, TicketPercent, Megaphone, Percent, Store,
//   Wallet, Bell, LogOut, ShoppingCart, ListTodo, Loader, UserPlus,
//   Repeat, MessageSquareQuote, Mail, Receipt, MapPinned, ShieldCheck,
//   Lock, X,
// } from "lucide-react";

// // ─── Types ───────────────────────────────────────────────────────────────────
// interface MenuItem {
//   label: string;
//   icon: LucideIcon;
//   path?: string;
//   children?: { label: string; path: string }[];
// }
// interface MenuSection {
//   section: string;
//   items: MenuItem[];
// }

// // ─── Menu data ───────────────────────────────────────────────────────────────
// const menuItems: MenuSection[] = [
//   {
//     section: "HOME",
//     items: [{ label: "Dashboard", icon: LayoutDashboard, path: "/" }],
//   },
//   {
//     section: "PRODUCTS",
//     items: [
//       { label: "All Products", icon: Package, path: "/products" },
//       { label: "Add Product",  icon: PlusCircle, path: "/add-product" },
//       {
//         label: "Categories", icon: Grid, path: "/categories",
//         children: [
//           { label: "📱 Electronics",   path: "/products/category/electronics" },
//           { label: "👕 Clothing",       path: "/products/category/clothing" },
//           { label: "🏠 Home & Kitchen", path: "/products/category/home-kitchen" },
//           { label: "📚 Books",          path: "/products/category/books" },
//           { label: "🧴 Beauty",         path: "/products/category/beauty" },
//         ],
//       },
//       { label: "Inventory",  icon: Boxes, path: "/inventory" },
//       { label: "Low Stock",  icon: AlertTriangle, path: "/low-stock" },
//     ],
//   },
//   {
//     section: "ORDERS",
//     items: [
//       { label: "All Orders",         icon: ShoppingCart, path: "/orders" },
//       { label: "Pending Orders",     icon: ListTodo,     path: "/orders/pending" },
//       { label: "Processing Orders",  icon: Loader,       path: "/orders/processing" },
//       { label: "Shipped Orders",     icon: Truck,        path: "/orders/shipped" },
//       { label: "Delivered Orders",   icon: PackageCheck, path: "/orders/delivered" },
//       { label: "Cancelled Orders",   icon: XCircle,      path: "/orders/cancelled" },
//       { label: "Returned Orders",    icon: RotateCcw,    path: "/orders/returned" },
//     ],
//   },
//   {
//     section: "CUSTOMERS",
//     items: [
//       { label: "All Customers",     icon: Users,              path: "/customers" },
//       { label: "New Customers",     icon: UserPlus,           path: "/customers/new" },
//       { label: "Repeat Customers",  icon: Repeat,             path: "/customers/repeat" },
//       { label: "Customer Ratings",  icon: Star,               path: "/customers/ratings" },
//       { label: "Customer Reviews",  icon: MessageSquareQuote, path: "/reviews" },
//       { label: "Messages",          icon: MessageSquare,      path: "/messages" },
//     ],
//   },
//   {
//     section: "ANALYTICS",
//     items: [
//       { label: "Sales Analytics",   icon: BarChart3,  path: "/sales-analytics" },
//       { label: "Top Products",      icon: Trophy,     path: "/top-products" },
//       { label: "Revenue Report",    icon: TrendingUp, path: "/revenue" },
//       { label: "Customer Insights", icon: Users,      path: "/customer-insights" },
//     ],
//   },
//   {
//     section: "MARKETING",
//     items: [
//       { label: "Coupons",         icon: TicketPercent, path: "/coupons" },
//       { label: "Campaigns",       icon: Megaphone,     path: "/campaigns" },
//       { label: "Discount",        icon: Percent,       path: "/discounts" },
//       { label: "Email Marketing", icon: Mail,          path: "/email-marketing" },
//       { label: "Cart Recovery",   icon: ShoppingCart,  path: "/cart-recovery" },
//     ],
//   },
//   {
//     section: "STORE",
//     items: [
//       { label: "Store Profile",   icon: Store,     path: "/store-profile" },
//       { label: "Shipping",        icon: Truck,     path: "/shipping" },
//       { label: "Payments",        icon: Wallet,    path: "/payments" },
//       { label: "Tax Settings",    icon: Receipt,   path: "/tax-settings" },
//       { label: "Delivery Zones",  icon: MapPinned, path: "/delivery-zones" },
//     ],
//   },
//   {
//     section: "SETTINGS",
//     items: [
//       { label: "Account Settings",    icon: Settings,    path: "/settings" },
//       { label: "Notifications",       icon: Bell,        path: "/notifications" },
//       { label: "Roles & Permissions", icon: ShieldCheck, path: "/roles-permissions" },
//       { label: "Security",            icon: Lock,        path: "/security" },
//       { label: "Logout",              icon: LogOut,      path: "/logout" },
//     ],
//   },
// ];

// // ─── Props ────────────────────────────────────────────────────────────────────
// interface DashboardSidebarProps {
//   isOpen: boolean;     // mobile drawer open state, controlled by parent
//   onClose: () => void; // close drawer (backdrop click or X button)
// }

// // ─── Component ────────────────────────────────────────────────────────────────
// const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
//   const navigate  = useNavigate();
//   const location  = useLocation();

//   // Categories submenu open by default
//   const [openSubmenus, setOpenSubmenus] = useState<string[]>(["Categories"]);

//   const toggleSubmenu = (label: string) =>
//     setOpenSubmenus((prev) =>
//       prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
//     );

//   const handleNav = (path?: string) => {
//     if (!path) return;
//     navigate(path);
//     // Auto-close drawer on mobile after navigation
//     if (window.innerWidth < 768) onClose();
//   };

//   return (
//     <>
//       {/* ── Backdrop: only renders on mobile when open ───────────────────── */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={onClose}
//           aria-hidden="true"
//         />
//       )}

//       {/* ── Sidebar panel ────────────────────────────────────────────────── */}
//       {/*
//         Desktop (md+): sticky in normal flow, always visible, no transform.
//         Mobile (<md):  fixed drawer. Slides in with translate-x-0 when isOpen,
//                        hidden off-screen with -translate-x-full when closed.
//       */}
//       <aside
//         className={`
//           w-[240px] bg-card border-r border-sidebar-border
//           flex flex-col shrink-0 z-50

//           md:relative md:sticky md:top-0 md:h-screen md:translate-x-0

//           fixed top-0 left-0 h-screen
//           transition-transform duration-300 ease-in-out
//           ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//         `}
//       >
//         {/* ── Brand / Logo ─────────────────────────────────────────────── */}
//         <div className="flex items-center gap-2 px-5 py-[18px] border-b border-sidebar-border">
//           <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
//             <Zap className="w-5 h-5 text-primary-foreground" />
//           </div>
//           <span className="text-lg font-bold text-foreground flex-1">Seller Hub</span>

//           {/* ✕ Close button — only visible on mobile */}
//           <button
//             onClick={onClose}
//             aria-label="Close sidebar"
//             className="md:hidden w-7 h-7 rounded-md flex items-center justify-center
//                        text-muted-foreground hover:bg-sidebar-accent transition-colors"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* ── Navigation ───────────────────────────────────────────────── */}
//         <nav className="flex-1 overflow-y-auto px-3 py-3 pb-6">
//           {menuItems.map((section) =>
//             section.items.length === 0 ? null : (
//               <div key={section.section} className="mb-1">

//                 {/* Section label */}
//                 <p className="text-[10px] font-bold text-muted-foreground uppercase
//                               tracking-widest px-3 pt-4 pb-2">
//                   {section.section}
//                 </p>

//                 {section.items.map((item) => {
//                   const Icon     = item.icon;
//                   const isActive = item.path ? location.pathname === item.path : false;
//                   const hasKids  = item.children && item.children.length > 0;
//                   const subOpen  = openSubmenus.includes(item.label);

//                   return (
//                     <div key={item.label}>
//                       {/* ── Nav button ── */}
//                       <button
//                         onClick={() =>
//                           hasKids ? toggleSubmenu(item.label) : handleNav(item.path)
//                         }
//                         className={`
//                           w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
//                           text-sm transition-colors mb-0.5
//                           ${isActive && !hasKids
//                             ? "bg-sidebar-accent text-sidebar-primary font-semibold"
//                             : "text-sidebar-foreground hover:bg-sidebar-accent"
//                           }
//                         `}
//                       >
//                         <Icon className="w-[18px] h-[18px] shrink-0" />
//                         <span className="flex-1 text-left">{item.label}</span>
//                         {hasKids && (
//                           subOpen
//                             ? <ChevronDown  className="w-4 h-4 text-muted-foreground" />
//                             : <ChevronRight className="w-4 h-4 text-muted-foreground" />
//                         )}
//                       </button>

//                       {/* ── Sub-items (category children) ── */}
//                       {hasKids && subOpen && (
//                         <div className="ml-4 border-l-2 border-sidebar-border pl-2 mb-1">
//                           {item.children!.map((child) => {
//                             const childActive = location.pathname === child.path;
//                             return (
//                               <button
//                                 key={child.path}
//                                 onClick={() => handleNav(child.path)}
//                                 className={`
//                                   w-full flex items-center gap-2 px-3 py-[7px]
//                                   rounded-lg text-[12.5px] transition-colors mb-0.5
//                                   ${childActive
//                                     ? "bg-sidebar-accent text-sidebar-primary font-semibold"
//                                     : "text-sidebar-foreground hover:bg-sidebar-accent"
//                                   }
//                                 `}
//                               >
//                                 <span
//                                   className={`w-1.5 h-1.5 rounded-full shrink-0 ${
//                                     childActive ? "bg-sidebar-primary" : "bg-muted-foreground opacity-50"
//                                   }`}
//                                 />
//                                 <span className="flex-1 text-left">{child.label}</span>
//                               </button>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )
//           )}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default DashboardSidebar;
// import { useNavigate, useLocation } from "react-router-dom";
// import type { LucideIcon } from "lucide-react";
// import {
//   LayoutDashboard,
//   Settings,
//   ChevronDown,
//   Zap,
//   Package,
//   Trophy,
//   AlertTriangle,
//   Truck,
//   PackageCheck,
//   XCircle,
//   RotateCcw,
//   PlusCircle,
//   Grid,
//   Boxes,
//   Users,
//   Star,
//   MessageSquare,
//   BarChart3,
//   TrendingUp,
//   TicketPercent,
//   Megaphone,
//   Percent,
//   Store,
//   Wallet,
//   Bell,
//   LogOut,
//   ShoppingCart,
//   ListTodo,
//   Loader,
//   UserPlus,
//   Repeat,
//   MessageSquareQuote,
//   Mail,
//   Receipt,
//   MapPinned,
//   ShieldCheck,
//   Lock,

// } from "lucide-react";

// interface MenuItem {
//   label: string;
//   icon: LucideIcon;
//   path?: string;
//   hasSubmenu?: boolean;
// }

// interface MenuSection {
//   section: string;
//   items: MenuItem[];
// }

// const menuItems: MenuSection[] = [
//   {
//     section: "HOME",
//     items: [
//       { label: "Dashboard", icon: LayoutDashboard, path: "/" },
//     ],
//   },
//   {
//     section: "PRODUCTS",
//     items: [
//       { label: "All Products", icon: Package, path: "/products" },
//       { label: "Add Product", icon: PlusCircle, path: "/add-product" },
//       { label: "Categories", icon: Grid, path: "/categories" },
//       { label: "Inventory", icon: Boxes, path: "/inventory" },
//       { label: "Low Stock", icon: AlertTriangle, path: "/low-stock" },
//     ],
//   },
//   {
//     section: "ORDERS",
//     items: [
//       { label: "All Orders", icon: ShoppingCart, path: "/orders" },
//       { label: "Pending Orders", icon: ListTodo, path: "/orders/pending" },
//       { label: "Processing Orders", icon: Loader, path: "/orders/processing" },
//       { label: "Shipped Orders", icon: Truck, path: "/orders/shipped" },
//       { label: "Delivered Orders", icon: PackageCheck, path: "/orders/delivered" },
//       { label: "Cancelled Orders", icon: XCircle, path: "/orders/cancelled" },
//       { label: "Returned Orders", icon: RotateCcw, path: "/orders/returned" },
//     ],
//   },
//   {
    
//   section: "CUSTOMERS",
//   items: [
//     { label: "All Customers", icon: Users, path: "/customers" },
//     { label: "New Customers", icon: UserPlus, path: "/customers/new" },
//     { label: "Repeat Customers", icon: Repeat, path: "/customers/repeat" },
//     { label: "Customer Ratings", icon: Star, path: "/customers/ratings" },
//     { label: "Customer Reviews", icon: MessageSquareQuote, path: "/reviews" },
//     { label: "Messages", icon: MessageSquare, path: "/messages" },
//   ],


//   },
//   {
//     section: "ANALYTICS",
//     items: [
//       { label: "Sales Analytics", icon: BarChart3, path: "/sales-analytics" },
//       { label: "Top Products", icon: Trophy, path: "/top-products" },
//       { label: "Revenue Report", icon: TrendingUp, path: "/revenue" },
//       { label: "Customer Insights", icon: Users, path: "/customer-insights" },

//     ],
//   },
//   {
//      section: "MARKETING",
//     items: [
//       { label: "Coupons", icon: TicketPercent, path: "/coupons" },
//       { label: "Campaigns", icon: Megaphone, path: "/campaigns" },
//       { label: "Discount", icon: Percent, path: "/discounts" },
//       { label: "Email Marketing", icon: Mail, path: "/email-marketing" },
//       { label: "Cart Recovery", icon: ShoppingCart, path: "/cart-recovery" },
//     ],
//   },
//   {
//    section: "STORE",
//     items: [
//       { label: "Store Profile", icon: Store, path: "/store-profile" },
//       { label: "Shipping", icon: Truck, path: "/shipping" },
//       { label: "Payments", icon: Wallet, path: "/payments" },
//       { label: "Tax Settings", icon: Receipt, path: "/tax-settings" },
//       { label: "Delivery Zones", icon: MapPinned, path: "/delivery-zones" },
//     ],
//   },
//   {
//     section: "SETTINGS",
//     items: [
//       { label: "Account Settings", icon: Settings, path: "/settings" },
//       { label: "Notifications", icon: Bell, path: "/notifications" },
//       { label: "Roles & Permissions", icon: ShieldCheck, path: "/roles-permissions" },
//       { label: "Security", icon: Lock, path: "/security" },
//       { label: "Logout", icon: LogOut, path: "/logout" },
//     ],
//   },
// ];

// const DashboardSidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <aside className="w-[270px] min-h-screen bg-card border-r border-sidebar-border flex flex-col shrink-0">
//       <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
//         <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
//           <Zap className="w-5 h-5 text-primary-foreground" />
//         </div>
//         <span className="text-lg font-bold text-foreground">Seller Hub</span>
//       </div>

//       <nav className="flex-1 overflow-y-auto px-4 py-3 pb-6">
//         {menuItems.map((section) =>
//           section.items.length === 0 ? null : (
//             <div key={section.section} className="mb-1">
//               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 pt-4 pb-2">
//                 {section.section}
//               </p>

//               {section.items.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = item.path ? location.pathname === item.path : false;

//                 return (
//                   <button
//                     key={item.label}
//                     onClick={() => (item.path ? navigate(item.path) : undefined)}
//                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
//                       isActive
//                         ? "bg-sidebar-accent text-sidebar-primary font-semibold"
//                         : "text-sidebar-foreground hover:bg-sidebar-accent"
//                     }`}
//                   >
//                     <Icon className="w-[18px] h-[18px] shrink-0" />
//                     <span className="flex-1 text-left">{item.label}</span>
//                     {item.hasSubmenu && (
//                       <ChevronDown className="w-4 h-4 text-muted-foreground" />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           )
//         )}
//       </nav>
//     </aside>
//   );
// };

// export default DashboardSidebar;



// import { useNavigate, useLocation } from "react-router-dom";
// import type { LucideIcon, } from "lucide-react";
// import {
//   LayoutDashboard, Settings, ChevronDown, Zap,
//   Package, ListTodo, Trophy, ShoppingCart, AlertTriangle, ListCheckIcon, Loader,Truck ,PackageCheck,XCircle ,RotateCcw ,PlusCircle,
//   Grid,Boxes,Users,Star, MessageSquare,BarChart3,TrendingUp,TicketPercent,Megaphone,Percent,Store,Wallet,Bell,LogOut
// } from "lucide-react";

// interface MenuItem {
//   label: string;
//   icon: LucideIcon;
//   path?: string;
//   hasSubmenu?: boolean;
// }

// interface MenuSection {
//   section: string;
//   items: MenuItem[];
// }

// const menuItems: MenuSection[] = [
//   {
//     section: "HOME",
//     items: [
//       { label: "Dashboard",  icon: LayoutDashboard, path: "/"          },
//       // { label: "Inventory",  icon: Package,         path: "/inventory" },

//     ],
//   },
//   {
//     section: "PRODUCTS",
// items: [
//  { label: "All Products", icon: Package, path: "/products" },
//  { label: "Add Product", icon: PlusCircle, path: "/add-product" },
//  { label: "Categories", icon: Grid, path: "/categories" },
//  { label: "Inventory", icon: Boxes, path: "/inventory" },
//  { label: "Low Stock", icon: AlertTriangle, path: "/low-stock" }
// ]
//   },
//   {
    
//     section: "ORDERS",
//     items: [
//      { label: 'All Orders', path: '/orders' }
// { label: 'Pending Orders', path: '/orders/pending' }
// { label: 'Processing Orders', path: '/orders/processing' }
// { label: 'Shipped Orders', path: '/orders/shipped' }
// { label: 'Delivered Orders', path: '/orders/delivered' }
// { label: 'Cancelled Orders', path: '/orders/cancelled' }
// { label: 'Returned Orders', path: '/orders/returned' }



//       // TODO: eather add logic to show list all orders and a toggle button to show just the pending orders
//       // { label: "Orders History",     icon: ListCheckIcon, path: "/orders"      },
//     ],
//   },
//   {
//     section: "CUSTOMERS",
// items: [
//  { label: "All Customers", icon: Users, path: "/customers" },
//  { label: "Customer Reviews", icon: Star, path: "/reviews" },
//  { label: "Messages", icon: MessageSquare, path: "/messages" }
// ]
//   },
//   {
//     section: "ANALYTICS",
// items: [
//  { label: "Sales Analytics", icon: BarChart3, path: "/sales-analytics" },
//  { label: "Top Products", icon: Trophy, path: "/top-products" },
//  { label: "Revenue Report", icon: TrendingUp, path: "/revenue" }
// ]
//   },
//   {
//     section: "MARKETING",
// items: [
//  { label: "Coupons", icon: TicketPercent, path: "/coupons" },
//  { label: "Campaigns", icon: Megaphone, path: "/campaigns" },
//  { label: "Discounts", icon: Percent, path: "/discounts" }
// ]
//   },
//   {
//     section: "STORE",
// items: [
//  { label: "Store Profile", icon: Store, path: "/store-profile" },
//  { label: "Shipping", icon: Truck, path: "/shipping" },
//  { label: "Payments", icon: Wallet, path: "/payments" }
// ]
//   },
//   {
//     section: "SETTINGS",
// items: [
//  { label: "Account Settings", icon: Settings, path: "/settings" },
//  { label: "Notifications", icon: Bell, path: "/notifications" },
//  { label: "Logout", icon: LogOut, path: "/logout" }
// ]
//   },
//   // {
//   //   section: "PAGES",
//   //   items: [
//   //     { label: "Account Setting",    icon: Settings,      path: "/settings"    },
//   //   ],
//   // },
// ];

// const DashboardSidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <aside className="w-[270px] min-h-screen bg-card border-r border-sidebar-border flex flex-col shrink-0">
//       {/* Logo / brand */}
//       <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
//         <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
//           <Zap className="w-5 h-5 text-primary-foreground" />
//         </div>
//         <span className="text-lg font-bold text-foreground">Seller Hub</span>
//       </div>

//       {/* Nav */}
//       <nav className="flex-1 overflow-y-auto px-4 py-3 pb-6">
//         {menuItems.map((section) =>
//           section.items.length === 0 ? null : (
//             <div key={section.section} className="mb-1">
//               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 pt-4 pb-2">
//                 {section.section}
//               </p>

//               {section.items.map((item) => {
//                 const Icon     = item.icon;
//                 const isActive = item.path ? location.pathname === item.path : false;

//                 return (
//                   <button
//                     key={item.label}
//                     onClick={() => item.path ? navigate(item.path) : undefined}
//                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
//                       isActive
//                         ? "bg-sidebar-accent text-sidebar-primary font-semibold"
//                         : "text-sidebar-foreground hover:bg-sidebar-accent"
//                     }`}
//                   >
//                     <Icon className="w-[18px] h-[18px] shrink-0" />
//                     <span className="flex-1 text-left">{item.label}</span>
//                     {item.hasSubmenu && (
//                       <ChevronDown className="w-4 h-4 text-muted-foreground" />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           )
//         )}
//       </nav>
//     </aside>
//   );
// };

// export default DashboardSidebar;
// // import { useNavigate, useLocation } from "react-router-dom";
// // import type { LucideIcon } from "lucide-react";
// // import {
// //   LayoutDashboard, Settings, ChevronDown, Zap,
// //   Package, ListTodo, Trophy, ShoppingCart, AlertTriangle, ListCheckIcon
// // } from "lucide-react";

// // interface MenuItem {
// //   label: string;
// //   icon: LucideIcon;
// //   path?: string;
// //   hasSubmenu?: boolean;
// // }

// // interface MenuSection {
// //   section: string;
// //   items: MenuItem[];
// // }

// // const menuItems: MenuSection[] = [
// //   {
// //     section: "HOME",
// //     items: [
// //       { label: "Dashboard",  icon: LayoutDashboard, path: "/"          },
// //       { label: "Inventory",  icon: Package,         path: "/inventory" },
// //     ],
// //   },
// //   {
// //     section: "ORDERS",
// //     items: [
// //       { label: "Pending Orders",     icon: ListTodo,     path: "/pending"     },
// //       { label: "All Orders",         icon: ShoppingCart, path: "/orders"      }, // TODO: eather add logic to show list all orders and a toggle button to show just the pending orders
// //       // { label: "Orders History",     icon: ListCheckIcon, path: "/orders"      },
// //     ],
// //   },
// //   {
// //     section: "ANALYTICS",
// //     items: [
// //       { label: "Top Selling",        icon: Trophy,        path: "/top_selling" },
// //       { label: "Low Stock",          icon: AlertTriangle, path: "/low-stock"   }, // TODO: eather add logic to see low stock product in the inventory and remove this 
// //     ],
// //   },
// //   {
// //     section: "PAGES",
// //     items: [
// //       { label: "Account Setting",    icon: Settings,      path: "/settings"    },
// //     ],
// //   },
// // ];

// // const DashboardSidebar = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   return (
// //     <aside className="w-[270px] min-h-screen bg-card border-r border-sidebar-border flex flex-col shrink-0">
// //       {/* Logo / brand */}
// //       <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
// //         <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
// //           <Zap className="w-5 h-5 text-primary-foreground" />
// //         </div>
// //         <span className="text-lg font-bold text-foreground">Seller Hub</span>
// //       </div>

// //       {/* Nav */}
// //       <nav className="flex-1 overflow-y-auto px-4 py-3 pb-6">
// //         {menuItems.map((section) =>
// //           section.items.length === 0 ? null : (
// //             <div key={section.section} className="mb-1">
// //               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 pt-4 pb-2">
// //                 {section.section}
// //               </p>

// //               {section.items.map((item) => {
// //                 const Icon     = item.icon;
// //                 const isActive = item.path ? location.pathname === item.path : false;

// //                 return (
// //                   <button
// //                     key={item.label}
// //                     onClick={() => item.path ? navigate(item.path) : undefined}
// //                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
// //                       isActive
// //                         ? "bg-sidebar-accent text-sidebar-primary font-semibold"
// //                         : "text-sidebar-foreground hover:bg-sidebar-accent"
// //                     }`}
// //                   >
// //                     <Icon className="w-[18px] h-[18px] shrink-0" />
// //                     <span className="flex-1 text-left">{item.label}</span>
// //                     {item.hasSubmenu && (
// //                       <ChevronDown className="w-4 h-4 text-muted-foreground" />
// //                     )}
// //                   </button>
// //                 );
// //               })}
// //             </div>
// //           )
// //         )}
// //       </nav>
// //     </aside>
// //   );
// // };

// // export default DashboardSidebar;
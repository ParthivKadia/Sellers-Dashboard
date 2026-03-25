import { useNavigate, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Settings,
  ChevronDown,
  Zap,
  Package,
  Trophy,
  AlertTriangle,
  Truck,
  PackageCheck,
  XCircle,
  RotateCcw,
  PlusCircle,
  Grid,
  Boxes,
  Users,
  Star,
  MessageSquare,
  BarChart3,
  TrendingUp,
  TicketPercent,
  Megaphone,
  Percent,
  Store,
  Wallet,
  Bell,
  LogOut,
  ShoppingCart,
  ListTodo,
  Loader,
  UserPlus,
  Repeat,
  MessageSquareQuote,
  Mail,
  Receipt,
  MapPinned,
  ShieldCheck,
  Lock,

} from "lucide-react";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  path?: string;
  hasSubmenu?: boolean;
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
      { label: "All Products", icon: Package, path: "/products" },
      { label: "Add Product", icon: PlusCircle, path: "/add-product" },
      { label: "Categories", icon: Grid, path: "/categories" },
      { label: "Inventory", icon: Boxes, path: "/inventory" },
      { label: "Low Stock", icon: AlertTriangle, path: "/low-stock" },
    ],
  },
  {
    section: "ORDERS",
    items: [
      { label: "All Orders", icon: ShoppingCart, path: "/orders" },
      { label: "Pending Orders", icon: ListTodo, path: "/orders/pending" },
      { label: "Processing Orders", icon: Loader, path: "/orders/processing" },
      { label: "Shipped Orders", icon: Truck, path: "/orders/shipped" },
      { label: "Delivered Orders", icon: PackageCheck, path: "/orders/delivered" },
      { label: "Cancelled Orders", icon: XCircle, path: "/orders/cancelled" },
      { label: "Returned Orders", icon: RotateCcw, path: "/orders/returned" },
    ],
  },
  {
    
  section: "CUSTOMERS",
  items: [
    { label: "All Customers", icon: Users, path: "/customers" },
    { label: "New Customers", icon: UserPlus, path: "/customers/new" },
    { label: "Repeat Customers", icon: Repeat, path: "/customers/repeat" },
    { label: "Customer Ratings", icon: Star, path: "/customers/ratings" },
    { label: "Customer Reviews", icon: MessageSquareQuote, path: "/reviews" },
    { label: "Messages", icon: MessageSquare, path: "/messages" },
  ],


  },
  {
    section: "ANALYTICS",
    items: [
      { label: "Sales Analytics", icon: BarChart3, path: "/sales-analytics" },
      { label: "Top Products", icon: Trophy, path: "/top-products" },
      { label: "Revenue Report", icon: TrendingUp, path: "/revenue" },
      { label: "Customer Insights", icon: Users, path: "/customer-insights" },

    ],
  },
  {
     section: "MARKETING",
    items: [
      { label: "Coupons", icon: TicketPercent, path: "/coupons" },
      { label: "Campaigns", icon: Megaphone, path: "/campaigns" },
      { label: "Discount", icon: Percent, path: "/discounts" },
      { label: "Email Marketing", icon: Mail, path: "/email-marketing" },
      { label: "Cart Recovery", icon: ShoppingCart, path: "/cart-recovery" },
    ],
  },
  {
   section: "STORE",
    items: [
      { label: "Store Profile", icon: Store, path: "/store-profile" },
      { label: "Shipping", icon: Truck, path: "/shipping" },
      { label: "Payments", icon: Wallet, path: "/payments" },
      { label: "Tax Settings", icon: Receipt, path: "/tax-settings" },
      { label: "Delivery Zones", icon: MapPinned, path: "/delivery-zones" },
    ],
  },
  {
    section: "SETTINGS",
    items: [
      { label: "Account Settings", icon: Settings, path: "/settings" },
      { label: "Notifications", icon: Bell, path: "/notifications" },
      { label: "Roles & Permissions", icon: ShieldCheck, path: "/roles-permissions" },
      { label: "Security", icon: Lock, path: "/security" },
      { label: "Logout", icon: LogOut, path: "/logout" },
    ],
  },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-[270px] min-h-screen bg-card border-r border-sidebar-border flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">Seller Hub</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-3 pb-6">
        {menuItems.map((section) =>
          section.items.length === 0 ? null : (
            <div key={section.section} className="mb-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 pt-4 pb-2">
                {section.section}
              </p>

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.path ? location.pathname === item.path : false;

                return (
                  <button
                    key={item.label}
                    onClick={() => (item.path ? navigate(item.path) : undefined)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.hasSubmenu && (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          )
        )}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;



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
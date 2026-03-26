// FILE: src/components/dashboard/DashboardLayout.tsx
// CREATE THIS NEW FILE

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close when resizing back to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      {/* Sidebar receives open state + close handler */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Right column: topbar + page */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Your existing DashboardTopbar — onToggleSidebar is already in it */}
        <DashboardTopbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Page content swaps here on navigation */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

// FILE: src/components/dashboard/DashboardLayout.tsx
// CREATE THIS NEW FILE — it connects topbar + sidebar hamburger state

// Then in App.tsx, wrap all your routes with <DashboardLayout>
// (see bottom of this file for exact App.tsx snippet)

// import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import DashboardSidebar from "./DashboardSidebar";
// import DashboardTopbar  from "./DashboardTopbar";

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Lock body scroll when mobile drawer is open
//   useEffect(() => {
//     document.body.style.overflow = sidebarOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [sidebarOpen]);

//   // Close drawer on Escape key
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setSidebarOpen(false);
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, []);

//   // Close drawer on resize to desktop
//   useEffect(() => {
//     const handler = () => {
//       if (window.innerWidth >= 768) setSidebarOpen(false);
//     };
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);

//   return (
//     <div className="flex h-screen overflow-hidden bg-background">

//       {/* Sidebar — receives open state + close handler */}
//       <DashboardSidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       {/* Main column */}
//       <div className="flex-1 flex flex-col overflow-hidden">

//         {/* Topbar — receives the open toggle */}
//         <DashboardTopbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

//         {/* Page content */}
//         <main className="flex-1 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// ─────────────────────────────────────────────────────────────────────────────
// HOW TO UPDATE App.tsx
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. Import DashboardLayout
//    import DashboardLayout from "@/components/dashboard/DashboardLayout";
//
// 2. Wrap ALL your dashboard routes inside one parent <Route>:
//
//    <Routes>
//      <Route element={<DashboardLayout />}>
//        <Route path="/"                              element={<Dashboard />} />
//        <Route path="/products"                      element={<AllProducts />} />
//        <Route path="/add-product"                   element={<AddProduct />} />
//        <Route path="/categories"                    element={<Categories />} />
//        <Route path="/products/category/:slug"       element={<CategoryProducts />} />
//        <Route path="/inventory"                     element={<Inventory />} />
//        <Route path="/low-stock"                     element={<LowStock />} />
//        <Route path="/orders"                        element={<AllOrders />} />
//        <Route path="/orders/pending"                element={<PendingOrders />} />
//        ... (all other pages)
//      </Route>
//    </Routes>
//
// The sidebar + topbar render ONCE. Only <Outlet /> (the page content)
// swaps on navigation — that's why the sidebar stays perfectly stable.
// ─────────────────────────────────────────────────────────────────────────────
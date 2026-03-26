import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/ScrollToTop";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// FIX 1: Removed duplicate <Dashboard /> import that didn't exist
//         Index.tsx IS your dashboard home page — use that for "/"
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import TopSelling from "./pages/TopSelling";

import AllProducts from "./pages/Products/AllProducts";
import AddProduct from "./pages/Products/AddProducts";
import Categories from "./pages/Products/Categories";
import Inventory from "./pages/Products/Inventory";
import LowStock from "./pages/Products/LowStock";

import AllOrders from "./pages/Orders/AllOrders";
import PendingOrders from "./pages/Orders/PendingOrders";
import ProcessingOrders from "./pages/Orders/ProcessingOrders";
import ShippedOrders from "./pages/Orders/ShippedOrders";
import DeliveredOrders from "./pages/Orders/DeliveredOrders";
import CancelledOrders from "./pages/Orders/CancelledOrders";
import ReturnedOrders from "./pages/Orders/ReturnedOrders";

import AllCustomers from "./pages/Customers/AllCustomers";
import NewCustomers from "./pages/Customers/NewCustomers";
import RepeatCustomers from "./pages/Customers/RepeatCustomers";
import CustomerRatings from "./pages/Customers/CustomerRatings";
import CustomerReviews from "./pages/Customers/CustomerReviews";
import Messages from "./pages/Customers/Messages";

import SalesAnalytics from "./pages/Analytics/SalesAnalytics";
import TopProducts from "./pages/Analytics/TopProducts";
import RevenueReport from "./pages/Analytics/RevenueReport";
import CustomerInsights from "./pages/Analytics/CustomerInsights";

import Coupons from "./pages/Marketing/Coupons";
import Campaigns from "./pages/Marketing/Campaigns";
import Discount from "./pages/Marketing/Discount";
import EmailMarketing from "./pages/Marketing/EmailMarketing";
import CartRecovery from "./pages/Marketing/CartRecovery";

import StoreProfile from "./pages/Store/StoreProfile";
import Shipping from "./pages/Store/Shipping";
import Payments from "./pages/Store/Payments";
import TaxSettings from "./pages/Store/TaxSettings";
import DeliveryZones from "./pages/Store/DeliveryZones";

import AccountSettings from "./pages/Settings/AccountSettings";
import Notifications from "./pages/Settings/Notifications";
import RolesPermissions from "./pages/Settings/RolesPermissions";
import Security from "./pages/Settings/Security";
import LogoutPage from "./pages/Settings/LogoutPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>

              {/* FIX 2: Public routes OUTSIDE DashboardLayout (no sidebar) */}
              <Route path="/sign-in" element={<SignIn />} />

              {/* FIX 3: All dashboard routes INSIDE DashboardLayout
                  - Removed duplicate <Route path="/" element={<Dashboard />} />
                  - Removed duplicate <Route path="/" element={<Index />} />
                  - Kept only one: path="/" → Index
                  - Moved /sign-in outside
                  - Closed the wrapper Route properly with </Route>         */}
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/top_selling" element={<TopSelling />} />

                <Route path="/products" element={<AllProducts />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products/category/:categorySlug" element={<Categories />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/low-stock" element={<LowStock />} />

                <Route path="/orders" element={<AllOrders />} />
                <Route path="/orders/pending" element={<PendingOrders />} />
                <Route path="/orders/processing" element={<ProcessingOrders />} />
                <Route path="/orders/shipped" element={<ShippedOrders />} />
                <Route path="/orders/delivered" element={<DeliveredOrders />} />
                <Route path="/orders/cancelled" element={<CancelledOrders />} />
                <Route path="/orders/returned" element={<ReturnedOrders />} />

                <Route path="/customers" element={<AllCustomers />} />
                <Route path="/customers/new" element={<NewCustomers />} />
                <Route path="/customers/repeat" element={<RepeatCustomers />} />
                <Route path="/customers/ratings" element={<CustomerRatings />} />
                <Route path="/reviews" element={<CustomerReviews />} />
                <Route path="/messages" element={<Messages />} />

                <Route path="/sales-analytics" element={<SalesAnalytics />} />
                <Route path="/top-products" element={<TopProducts />} />
                <Route path="/revenue" element={<RevenueReport />} />
                <Route path="/customer-insights" element={<CustomerInsights />} />

                <Route path="/coupons" element={<Coupons />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/discounts" element={<Discount />} />
                <Route path="/email-marketing" element={<EmailMarketing />} />
                <Route path="/cart-recovery" element={<CartRecovery />} />

                <Route path="/store-profile" element={<StoreProfile />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/tax-settings" element={<TaxSettings />} />
                <Route path="/delivery-zones" element={<DeliveryZones />} />

                <Route path="/settings" element={<AccountSettings />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/roles-permissions" element={<RolesPermissions />} />
                <Route path="/security" element={<Security />} />
                <Route path="/logout" element={<LogoutPage />} />
              </Route>

              {/* 404 — outside everything */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}


// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { ThemeProvider } from "./components/theme-provider";
// import ScrollToTop from "./components/ScrollToTop";
// import DashboardLayout from "@/components/dashboard/DashboardLayout";


// import Index from "./pages/Index";
// import SignIn from "./pages/SignIn";
// import NotFound from "./pages/NotFound";
// import TopSelling from "./pages/TopSelling";

// import AllProducts from "./pages/Products/AllProducts";
// import AddProduct from "./pages/Products/AddProducts";
// import Categories from "./pages/Products/Categories";
// import Inventory from "./pages/Products/Inventory";
// import LowStock from "./pages/Products/LowStock";

// import AllOrders from "./pages/Orders/AllOrders";
// import PendingOrders from "./pages/Orders/PendingOrders";
// import ProcessingOrders from "./pages/Orders/ProcessingOrders";
// import ShippedOrders from "./pages/Orders/ShippedOrders";
// import DeliveredOrders from "./pages/Orders/DeliveredOrders";
// import CancelledOrders from "./pages/Orders/CancelledOrders";
// import ReturnedOrders from "./pages/Orders/ReturnedOrders";

// import AllCustomers from "./pages/Customers/AllCustomers";
// import NewCustomers from "./pages/Customers/NewCustomers";
// import RepeatCustomers from "./pages/Customers/RepeatCustomers";
// import CustomerRatings from "./pages/Customers/CustomerRatings";
// import CustomerReviews from "./pages/Customers/CustomerReviews";
// import Messages from "./pages/Customers/Messages";

// import SalesAnalytics from "./pages/Analytics/SalesAnalytics";
// import TopProducts from "./pages/Analytics/TopProducts";
// import RevenueReport from "./pages/Analytics/RevenueReport";
// import CustomerInsights from "./pages/Analytics/CustomerInsights";

// import Coupons from "./pages/Marketing/Coupons";
// import Campaigns from "./pages/Marketing/Campaigns";
// import Discount from "./pages/Marketing/Discount";
// import EmailMarketing from "./pages/Marketing/EmailMarketing";
// import CartRecovery from "./pages/Marketing/CartRecovery";

// import StoreProfile from "./pages/Store/StoreProfile";
// import Shipping from "./pages/Store/Shipping";
// import Payments from "./pages/Store/Payments";
// import TaxSettings from "./pages/Store/TaxSettings";
// import DeliveryZones from "./pages/Store/DeliveryZones";

// import AccountSettings from "./pages/Settings/AccountSettings";
// import Notifications from "./pages/Settings/Notifications";
// import RolesPermissions from "./pages/Settings/RolesPermissions";
// import Security from "./pages/Settings/Security";
// import LogoutPage from "./pages/Settings/LogoutPage";


// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <QueryClientProvider client={queryClient}>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <ScrollToTop />
//             <Routes>

//               <Route element={<DashboardLayout />}>   {/* ← wrap everything here */}
//               <Route path="/" element={<Dashboard />} />

//               <Route path="/" element={<Index />} />
//               <Route path="/sign-in" element={<SignIn />} />
//               <Route path="/top_selling" element={<TopSelling />} />

//               <Route path="/products" element={<AllProducts />} />
//               <Route path="/add-product" element={<AddProduct />} />
//               <Route path="/categories" element={<Categories />} />
//               <Route path="/inventory" element={<Inventory />} />
//               <Route path="/low-stock" element={<LowStock />} />

//               <Route path="/orders" element={<AllOrders />} />
//               <Route path="/orders/pending" element={<PendingOrders />} />
//               <Route path="/orders/processing" element={<ProcessingOrders />} />
//               <Route path="/orders/shipped" element={<ShippedOrders />} />
//               <Route path="/orders/delivered" element={<DeliveredOrders />} />
//               <Route path="/orders/cancelled" element={<CancelledOrders />} />
//               <Route path="/orders/returned" element={<ReturnedOrders />} />

//               <Route path="/customers" element={<AllCustomers />} />
//               <Route path="/customers/new" element={<NewCustomers />} />
//               <Route path="/customers/repeat" element={<RepeatCustomers />} />
//               <Route path="/customers/ratings" element={<CustomerRatings />} />
//               <Route path="/reviews" element={<CustomerReviews />} />
//               <Route path="/messages" element={<Messages />} />

//               <Route path="/sales-analytics" element={<SalesAnalytics />} />
//               <Route path="/top-products" element={<TopProducts />} />
//               <Route path="/revenue" element={<RevenueReport />} />
//               <Route path="/customer-insights" element={<CustomerInsights />} />

//               <Route path="/coupons" element={<Coupons />} />
//               <Route path="/campaigns" element={<Campaigns />} />
//               <Route path="/discounts" element={<Discount />} />
//               <Route path="/email-marketing" element={<EmailMarketing />} />
//               <Route path="/cart-recovery" element={<CartRecovery />} />

//               <Route path="/store-profile" element={<StoreProfile />} />
//               <Route path="/shipping" element={<Shipping />} />
//               <Route path="/payments" element={<Payments />} />
//               <Route path="/tax-settings" element={<TaxSettings />} />
//               <Route path="/delivery-zones" element={<DeliveryZones />} />

//               <Route path="/settings" element={<AccountSettings />} />
//               <Route path="/notifications" element={<Notifications />} />
//               <Route path="/roles-permissions" element={<RolesPermissions />} />
//               <Route path="/security" element={<Security />} />
//               <Route path="/logout" element={<LogoutPage />} />

//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </BrowserRouter>
//         </TooltipProvider>
//       </QueryClientProvider>
//     </ThemeProvider>
//   );
// }

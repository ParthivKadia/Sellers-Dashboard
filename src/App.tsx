import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/ScrollToTop";

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
// import LogoutPage from "./pages/Settings/LogoutPage.tsx";
import LogOutPage from "./pages/Settings/LogOutPage";


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
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/top_selling" element={<TopSelling />} />

              <Route path="/products" element={<AllProducts />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/categories" element={<Categories />} />
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
              <Route path="/logout" element={<LogOutPage />} />

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
// import { ThemeProvider } from "./components/theme-provider.tsx";
// import ScrollToTop from "./components/ScrollToTop";


// import Index from "./pages/Index.tsx";
// import SignIn from "./pages/SignIn.tsx";
// import NotFound from "./pages/NotFound.tsx";
// import TopSelling from "./pages/TopSelling.tsx";

// import AllProducts from "./pages/Products/AllProducts.tsx";
// import AddProduct from "./pages/Products/AddProducts.tsx";
// import Categories from "./pages/Products/Categories.tsx";
// import Inventory from "./pages/Products/Inventory.tsx";
// import LowStock from "./pages/Products/LowStock.tsx";

// import AllOrders from "./pages/Orders/AllOrders";
// import PendingOrders from "./pages/Orders/PendingOrders";
// import ProcessingOrders from "./pages/Orders/ProcessingOrders";
// import ShippedOrders from "./pages/Orders/ShippedOrders.tsx";
// import DeliveredOrders from "./pages/Orders/DeliveredOrders.tsx";
// import CancelledOrders from "./pages/Orders/CancelledOrders.tsx";
// import ReturnedOrders from "./pages/Orders/ReturnedOrders.tsx";

// import AllCustomers from "./pages/Customers/AllCustomers";
// import NewCustomers from "./pages/Customers/NewCustomers";
// import RepeatCustomers from "./pages/Customers/RepeatCustomers";
// import CustomerRatings from "./pages/Customers/CustomerRatings";
// import CustomerReviews from "./pages/Customers/CustomerReviews";
// import Messages from "./pages/Customers/Messages";

// import SalesAnalytics from "./pages/Analytics/SalesAnalytics";
// import TopProducts from "./pages/Analytics/TopProducts";
// import RevenueReport from "./pages/Analytics/RevenueReport.tsx";
// import CustomerInsights from "./pages/Analytics/CustomerInsights";

// import Coupons from "./pages/Marketing/Coupons";
// import Campaigns from "./pages/Marketing/Campaigns";
// import Discount from "./pages/Marketing/Discount.tsx";
// import EmailMarketing from "./pages/Marketing/EmailMarketing";
// import CartRecovery from "./pages/Marketing/CartRecovery.tsx";

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

// const App = () => (
//   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <ScrollToTop />

//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/sign-in" element={<SignIn />} />
//             <Route path="/top_selling" element={<TopSelling />} />

//             <Route path="/products" element={<AllProducts />} />
//             <Route path="/add-product" element={<AddProduct />} />
//             <Route path="/categories" element={<Categories />} />
//             <Route path="/inventory" element={<Inventory />} />
//             <Route path="/low-stock" element={<LowStock />} />

//             <Route path="/orders" element={<AllOrders />} />
//             <Route path="/orders/pending" element={<PendingOrders />} />
//             <Route path="/orders/processing" element={<ProcessingOrders />} />
//             <Route path="/orders/shipped" element={<ShippedOrders />} />
//             <Route path="/orders/delivered" element={<DeliveredOrders />} />
//             <Route path="/orders/cancelled" element={<CancelledOrders />} />
//             <Route path="/orders/returned" element={<ReturnedOrders />} /> 

//             <Route path="/customers" element={<AllCustomers />} />
//             <Route path="/customers/new" element={<NewCustomers />} />
//             <Route path="/customers/repeat" element={<RepeatCustomers />} />
//             <Route path="/customers/ratings" element={<CustomerRatings />} />
//             <Route path="/reviews" element={<CustomerReviews />} />
//             <Route path="/messages" element={<Messages />} />


//             <Route path="/sales-analytics" element={<SalesAnalytics />} />
//             <Route path="/top-products" element={<TopProducts />} />
//             <Route path="/revenue" element={<RevenueReport />} />
//             <Route path="/customer-insights" element={<CustomerInsights />} />


//             <Route path="/coupons" element={<Coupons />} />
//             <Route path="/campaigns" element={<Campaigns />} />
//             <Route path="/discounts" element={<Discount />} />
//             <Route path="/email-marketing" element={<EmailMarketing />} />
//             <Route path="/cart-recovery" element={<CartRecovery />} />

//             <Route path="/store-profile" element={<StoreProfile />} />
//             <Route path="/shipping" element={<Shipping />} />
//             <Route path="/payments" element={<Payments />} />
//             <Route path="/tax-settings" element={<TaxSettings />} />
//             <Route path="/delivery-zones" element={<DeliveryZones />} />

//             {/* <Route path="/settings" element={<AccountSettings />} /> */}
//             <Route path="/settings" element={<AccountSettings />} />

//             <Route path="/notifications" element={<Notifications />} />
//             <Route path="/roles-permissions" element={<RolesPermissions />} />
//             <Route path="/security" element={<Security />} />
//             <Route path="/logout" element={<LogoutPage />} />





//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   </ThemeProvider>
// );

// export default App;
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Route, Routes } from "react-router-dom";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { Toaster } from "@/components/ui/toaster";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import Index from "./pages/Index.tsx";
// // import SignIn from "./pages/SignIn.tsx";
// // // import Inventory from "./pages/Inventory.tsx";
// // import NotFound from "./pages/NotFound.tsx";
// // import { ThemeProvider } from "./components/theme-provider.tsx";
// // import PendingShipmentsCard from "./components/dashboard/PendingShipmentsCard.tsx";
// // // import Pending from "./pages/orders/pending".tsx";
// // import TopSelling from "./pages/TopSelling.tsx";
// // import AllProducts from './pages/Products/AllProducts.tsx'
// // import AddProduct from './pages/Products/AddProducts.tsx';
// // import Categories from "./pages/Products/Categories.tsx";
// // import Inventory from "./pages/Products/Inventory.tsx";
// // import LowStock from "./pages/Products/LowStock.tsx";
// // import AllOrders from './pages/Orders/AllOrders';
// // import PendingOrders from './pages/Orders/PendingOrders';
// // // import ProcessingOrders from './pages/Orders/ProcessingOrders';
// // // import ShippedOrders from './pages/Orders/ShippedOrders';
// // // import DeliveredOrders from './pages/Orders/DeliveredOrders';
// // // import CancelledOrders from './pages/Orders/CancelledOrders';
// // // import ReturnedOrders from './pages/Orders/ReturnedOrders';






// // const queryClient = new QueryClient();

// // const App = () => (
// //   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
// //   <QueryClientProvider client={queryClient}>
// //     <TooltipProvider>
// //       <Toaster />
// //       <Sonner />
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/" element={<Index />} />
// //           <Route path="/sign-in" element={<SignIn />} />
// //           {/* <Route path="/inventory" element={<Inventory />} /> */}
// //           {/* <Route path="/pending" element={<Pending />} /> */}
// //           <Route path="/top_selling" element={<TopSelling />} />
// //           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
// //           <Route path="/products" element={<AllProducts />} />
// //           {/* <Route path="/products/add" element={<AddProduct />} /> */}
// //           <Route path="/add-product" element={<AddProduct />} />
// //           <Route path="/categories" element={<Categories />} />
// //                     <Route path="/inventory" element={<Inventory />} />

// //           {/* <Route path="/lowstock" element={<LowStock />} /> */}
// //             <Route path="/low-stock" element={<LowStock />} />
// //             <Route path="/orders" element={<AllOrders />} />
// // {/* <Route path="/orders/pending" element={<PendingOrders />} /> */}
// // <Route path="/orders/pending" element={<PendingOrders />} />

// // {/* <Route path="/orders/processing" element={<ProcessingOrders />} />
// // <Route path="/orders/shipped" element={<ShippedOrders />} />
// // <Route path="/orders/delivered" element={<DeliveredOrders />} />
// // <Route path="/orders/cancelled" element={<CancelledOrders />} />
// // <Route path="/orders/returned" element={<ReturnedOrders />} /> */} */








// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </TooltipProvider>
// //   </QueryClientProvider>
// //   </ThemeProvider>
// // );

// // export default App;

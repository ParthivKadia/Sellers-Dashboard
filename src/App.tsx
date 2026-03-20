import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SignIn from "./pages/SignIn.tsx";
import Inventory from "./pages/Inventory.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import PendingShipmentsCard from "./components/dashboard/PendingShipmentsCard.tsx";
import Pending from "./pages/Pendings.tsx";
import TopSelling from "./pages/TopSelling.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/top_selling" element={<TopSelling />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;

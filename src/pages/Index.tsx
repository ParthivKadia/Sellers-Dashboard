import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatCards from "@/components/dashboard/StatCards";
import ProfitExpensesChart from "@/components/dashboard/ProfitExpensesChart";
import ProductSalesChart from "@/components/dashboard/ProductSalesChart";
import NewGoalsCard from "@/components/dashboard/NewGoalsCard";
import TrafficDistribution from "@/components/dashboard/TrafficDistribution";
// import RecentOrdersCard from "@/components/dashboard/RecentOrdersCard";
// import LowStockAlerts from "@/components/dashboard/LowStockAlerts";
import TopProductsTable from "@/components/dashboard/TopProductsTable";
// import PendingShipmentsCard from "@/components/dashboard/PendingShipmentsCard";
import RecentOrdersCard from "@/components/dashboard/RecentOrdersCard";
import LowStockAlerts from "@/components/dashboard/LowStockAlerts";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex lg:shrink-0">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar />

        <main className="flex-1 p-6 overflow-auto">
          {/*
            12-column grid — every row sums to 12.

            Row 1 │ WelcomeCard (6)          │ StatCards ×3 (6)           │ = 12
            Row 2 │ ProfitExpensesChart (7)  │ ProductSalesChart (5)      │ = 12
            Row 3 │ NewGoalsCard (3)         │ TrafficDistribution (5)    │ RecentOrdersCard (4) │ = 12
            Row 4 │ PendingShipmentsCard (12 — full width)               │ = 12
            Row 5 │ LowStockAlerts (5)       │ TopProductsTable (7)       │ = 12
          */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ── Row 1: Welcome + KPI Stats ── */}
            <div className="col-span-1 lg:col-span-6">
              <WelcomeCard />
            </div>
            <div className="col-span-1 lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCards />
            </div>

            {/* ── Row 2: P&L Chart + Units Sold trend ── */}
            <div className="col-span-1 lg:col-span-7">
              <ProfitExpensesChart />
            </div>
            <div className="col-span-1 lg:col-span-5">
              <ProductSalesChart />
            </div>

            {/* ── Row 3: Monthly Target + Order Sources + Recent Orders ── */}
            <div className="col-span-1 lg:col-span-3">
              <NewGoalsCard />
            </div>
            {/* <div className="col-span-1 lg:col-span-5">
              <TrafficDistribution />
            </div> */}
            {/* <div className="col-span-1 lg:col-span-4">
              <RecentOrdersCard />
            </div> */}

            {/* ── Row 4: Pending Shipments (full width) ── */}
            {/* <div className="col-span-1 lg:col-span-12">
              <PendingShipmentsCard />
            </div> */}

            {/* ── Row 5: Low Stock + Top Products ── */}
            {/* <div className="col-span-1 lg:col-span-5">
              <LowStockAlerts />
            </div> */}
            {/* <div className="col-span-1 lg:col-span-7">
              <TopProductsTable />
            </div> */}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
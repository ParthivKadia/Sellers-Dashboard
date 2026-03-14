import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatCards from "@/components/dashboard/StatCards";
import ProfitExpensesChart from "@/components/dashboard/ProfitExpensesChart";
import ProductSalesChart from "@/components/dashboard/ProductSalesChart";
import NewGoalsCard from "@/components/dashboard/NewGoalsCard";
import TrafficDistribution from "@/components/dashboard/TrafficDistribution";
import FigmaTipsCard from "@/components/dashboard/FigmaTipsCard";
import UpcomingSchedules from "@/components/dashboard/UpcomingSchedules";
import TopEmployeesTable from "@/components/dashboard/TopEmployeesTable";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-6">
            {/* Row 1: Welcome + Stats */}
            <WelcomeCard />
            <div className="col-span-full lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCards />
            </div>

            {/* Row 2: Profit chart + Product Sales */}
            <ProfitExpensesChart />
            <ProductSalesChart />

            {/* Row 3: Goals + Traffic + Figma Tips */}
            <div className="col-span-full lg:col-span-3 grid grid-cols-1 gap-6">
              <NewGoalsCard />
            </div>
            <div className="col-span-full lg:col-span-5">
              <TrafficDistribution />
            </div>
            <FigmaTipsCard />

            {/* Row 4: Schedules + Table */}
            <UpcomingSchedules />
            <div className="col-span-full lg:col-span-7">
              <TopEmployeesTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

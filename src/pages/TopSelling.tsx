import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
// import PendingShipmentsCard from "@/components/dashboard/PendingShipmentsCard";
import TopProductsTable from "@/components/dashboard/TopProductsTable";

export default function TopSelling() {
    return (
        <div className="flex min-h-screen bg-background">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col">
            <DashboardTopbar />

            <main className="p-6 space-y-6">
                <TopProductsTable />
            </main>
            </div>
        </div>
    )
}
import { Search, Bell, Menu, Settings } from "lucide-react";
import user2 from "@/assets/user-2.jpg";

interface Props {
  onToggleSidebar?: () => void;
}

const DashboardTopbar = ({ onToggleSidebar }: Props) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="text-muted-foreground hover:text-foreground lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Try to searching ..."
            className="pl-9 pr-4 py-2 text-sm bg-secondary rounded-lg border-none outline-none w-[240px] placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary text-muted-foreground">
          <Bell className="w-[18px] h-[18px]" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary text-muted-foreground">
          <Settings className="w-[18px] h-[18px]" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          <img src={user2} alt="User" className="w-9 h-9 rounded-full object-cover" />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-foreground leading-tight">Mike Nielsen</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;

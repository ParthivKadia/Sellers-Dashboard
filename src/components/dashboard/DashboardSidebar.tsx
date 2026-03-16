import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, MessageSquare, StickyNote,
  Calendar, Mail, Ticket, Columns, Receipt, Settings, ChevronDown, Zap, Package
} from "lucide-react";

const menuItems = [
  { section: "HOME", items: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Inventory", icon: Package, path: "/inventory" },
  ]},
  { section: "APPS", items: [
    { label: "Contacts", icon: Users },
    { label: "Blogs", icon: FileText, hasSubmenu: true },
    { label: "Ecommerce", icon: Receipt, hasSubmenu: true },
    { label: "Chats", icon: MessageSquare },
    { label: "Notes", icon: StickyNote },
    { label: "Calendar", icon: Calendar },
    { label: "Email", icon: Mail },
    { label: "Tickets", icon: Ticket },
    { label: "Kanban", icon: Columns },
    { label: "Invoice", icon: Receipt, hasSubmenu: true },
  ]},
  { section: "PAGES", items: [
    { label: "Account Setting", icon: Settings },
  ]},
];

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-[270px] min-h-screen bg-card border-r border-sidebar-border flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">Spike Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-4">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 py-3">
              {section.section}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.path ? location.pathname === item.path : false;
              return (
                <button
                  key={item.label}
                  onClick={() => item.path ? navigate(item.path) : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasSubmenu && <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

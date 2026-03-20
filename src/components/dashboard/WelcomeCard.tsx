import { TrendingUp, ShoppingBag, IndianRupee } from "lucide-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const WelcomeCard = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const emoji = hour < 12 ? "☀️" : hour < 17 ? "👋" : "🌙";

  // Today's snapshot — in a real app these would come from the API
  const todayStats = [
    { label: "Orders today", value: "24", icon: ShoppingBag, color: "text-blue-400" },
    { label: "Revenue today", value: "₹18,240", icon: IndianRupee, color: "text-emerald-400" },
    { label: "Avg. order value", value: "₹760", icon: TrendingUp, color: "text-amber-400" },
  ];

  return (
    <div className="bg-primary rounded-xl p-6 overflow-hidden relative min-h-[160px] flex flex-col justify-between">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-12 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10">
        <p className="text-primary-foreground/70 text-sm mb-0.5">{greeting} {emoji}</p>
        <h3 className="text-xl font-bold text-primary-foreground capitalize">
          {username ?? "Seller"}
        </h3>
        <p className="text-primary-foreground/60 text-xs mt-1">
          Here's what's happening in your store today.
        </p>
      </div>

      {/* Today's snapshot */}
      <div className="relative z-10 mt-4 grid grid-cols-3 gap-3">
        {todayStats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white/10 rounded-lg px-3 py-2.5">
              <Icon className={`w-4 h-4 mb-1 ${s.color}`} />
              <p className="text-primary-foreground font-bold text-sm">{s.value}</p>
              <p className="text-primary-foreground/60 text-[10px] leading-tight">{s.label}</p>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate(`/inventory`)}
        className="relative z-10 mt-4 self-start bg-primary-foreground text-primary text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
      >
        Manage Inventory →
      </button>
    </div>
  );
};

export default WelcomeCard;
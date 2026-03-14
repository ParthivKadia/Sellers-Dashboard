import { Lightbulb } from "lucide-react";
import user3 from "@/assets/user-3.jpg";

const NewGoalsCard = () => {
  return (
    <div className="bg-card rounded-xl col-span-full lg:col-span-2 flex flex-col">
      <div className="bg-sidebar-accent rounded-xl p-5 flex-1 flex flex-col items-start justify-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-3">
          <Lightbulb className="w-5 h-5 text-primary-foreground" />
        </div>
        <h5 className="text-sm font-semibold text-foreground">New Goals</h5>
        <p className="text-lg font-bold text-primary">83%</p>
        <div className="w-full bg-primary/20 rounded-full h-1.5 mt-2">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: "83%" }} />
        </div>
      </div>
      <div className="p-5 flex items-center gap-3">
        <img src={user3} alt="Adam" className="w-11 h-11 rounded-full object-cover" />
        <div>
          <p className="text-xs text-primary font-medium">#1 in DevOps</p>
          <p className="text-sm font-semibold text-foreground">Adam Johnson</p>
          <p className="text-xs text-muted-foreground">Top Developer</p>
        </div>
      </div>
    </div>
  );
};

export default NewGoalsCard;

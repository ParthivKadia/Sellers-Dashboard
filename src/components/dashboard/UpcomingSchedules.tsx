import user2 from "@/assets/user-2.jpg";
import user3 from "@/assets/user-3.jpg";
import user4 from "@/assets/user-4.jpg";
import user5 from "@/assets/user-5.jpg";

const schedules = [
  { title: "Marketing Meeting", time: "08:30 - 10:00", color: "border-l-primary" },
  { title: "Applied Mathematics", time: "10:15 - 11:45", color: "border-l-success" },
  { title: "SEO Session with Team", time: "12:00 - 13:25", color: "border-l-warning" },
];

const avatars = [user2, user3, user4, user5];

const UpcomingSchedules = () => {
  return (
    <div className="bg-card rounded-xl p-6 col-span-full lg:col-span-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-semibold text-card-foreground">Upcoming Schedules</h4>
        <div className="flex gap-1">
          {["1 To 3", "4 To 7", "8 To 10"].map((label, i) => (
            <button
              key={label}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition ${
                i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {schedules.map((s) => (
          <div key={s.title} className={`border-l-4 ${s.color} bg-secondary/50 rounded-lg p-4`}>
            <h5 className="text-sm font-semibold text-foreground">{s.title}</h5>
            <p className="text-xs text-muted-foreground mt-1">{s.time}</p>
            <div className="flex items-center mt-3">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="" className="w-7 h-7 rounded-full border-2 border-card object-cover -ml-1.5 first:ml-0" />
              ))}
              <span className="ml-2 text-xs text-muted-foreground font-medium">+18</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSchedules;

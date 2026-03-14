import user2 from "@/assets/user-2.jpg";
import user3 from "@/assets/user-3.jpg";
import user4 from "@/assets/user-4.jpg";
import user5 from "@/assets/user-5.jpg";
import user6 from "@/assets/user-6.jpg";

const employees = [
  { name: "Mark J. Freeman", role: "Developer", rate: "$80/hour", skill: "HTML", status: "Available", statusColor: "bg-success", avatar: user2 },
  { name: "Nina R. Oldman", role: "Designer", rate: "$70/hour", skill: "JavaScript", status: "On Holiday", statusColor: "bg-warning", avatar: user3 },
  { name: "Arya H. Shah", role: "Developer", rate: "$40/hour", skill: "React", status: "Absent", statusColor: "bg-destructive", avatar: user4 },
  { name: "June R. Smith", role: "Designer", rate: "$20/hour", skill: "Vuejs", status: "On Leave", statusColor: "bg-info", avatar: user5 },
  { name: "Deo K. Luis", role: "Developer", rate: "$65/hour", skill: "Angular", status: "Available", statusColor: "bg-success", avatar: user6 },
];

const TopEmployeesTable = () => {
  return (
    <div className="bg-card rounded-xl p-6 col-span-full">
      <h4 className="text-base font-semibold text-card-foreground mb-4">Top Employees</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Profile</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Hour Rate</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Skills</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.name} className="border-b border-border last:border-0">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <img src={e.avatar} alt={e.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-foreground">{e.name}</p>
                      <p className="text-xs text-muted-foreground">{e.role}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-muted-foreground">{e.rate}</td>
                <td className="py-3 px-2">
                  <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full font-medium">
                    {e.skill}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={`${e.statusColor} text-primary-foreground text-xs px-2.5 py-1 rounded-full font-medium`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopEmployeesTable;

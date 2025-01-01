import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Building, Users, Wrench } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Building, label: "Properties", path: "/properties" },
    { icon: Users, label: "Tenants", path: "/tenants" },
    { icon: Wrench, label: "Maintenance", path: "/maintenance" },
  ];

  return (
    <div className="h-screen w-64 border-r bg-white p-4">
      <div className="flex h-14 items-center border-b px-2 font-semibold">
        Property Manager
      </div>
      <div className="space-y-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Button
              key={item.path}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isActive && "bg-secondary",
              )}
              asChild
            >
              <Link to={item.path}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

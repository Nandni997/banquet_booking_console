import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  { name: "Calendar", icon: CalendarIcon, path: "/calendar" },
  { name: "Bookings", icon: ClipboardDocumentListIcon, path: "/bookings" },
  { name: "Customers", icon: UsersIcon, path: "/customers" },
  { name: "Halls", icon: BuildingStorefrontIcon, path: "/halls" },
  { name: "Locations", icon: MapPinIcon, path: "/locations" },
  { name: "Reports", icon: ChartBarIcon, path: "/reports" },
  { name: "Settings", icon: Cog6ToothIcon, path: "/settings" },
];

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={clsx(
        "bg-white shadow-md transition-all duration-300 border-r border-gray-200",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="h-16 px-4 flex items-center justify-center border-b">
        <div className="font-bold text-xl text-primary">
          {isOpen ? "Banquet CRM" : "B"}
        </div>
      </div>

      <nav className="p-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-4 rounded-2xl px-3 h-12 transition",
                isActive
                  ? "bg-purple-50 text-primary border border-purple-100"
                  : "text-gray-700 hover:bg-gray-50"
              )
            }
          >
            <item.icon className="h-6 w-6 shrink-0" />
            {isOpen && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
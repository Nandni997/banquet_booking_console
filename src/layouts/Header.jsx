import { Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 h-16">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="h-10 w-10 rounded-xl hover:bg-gray-100 flex items-center justify-center"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>

        <div>
          <div className="font-semibold text-gray-800">
            Banquet Booking System
          </div>
          <div className="text-xs text-gray-500">
            Operations Dashboard
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-200 px-4 py-2">
          <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-800">
              {user?.name || "Admin User"}
            </div>
            <div className="text-xs text-gray-500">
              {user?.email || "admin@banquetcrm.com"}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="h-11 px-4 rounded-xl bg-primary text-white font-medium hover:opacity-95"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
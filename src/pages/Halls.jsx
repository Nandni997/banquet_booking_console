import { useMemo, useState } from "react";
import Layout from "../layouts/Layout";
import HallTable from "../components/hall/HallTable";
import HallDrawer from "../components/hall/HallDrawer";
import useHallStore from "../store/useHallStore";

function Halls() {
  const { halls, addHall, updateHall } = useHallStore();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create");
  const [selectedHall, setSelectedHall] = useState(null);

  const filteredHalls = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return halls.filter((hall) => {
      const matchesSearch =
        !keyword ||
        hall.name.toLowerCase().includes(keyword) ||
        hall.location.toLowerCase().includes(keyword) ||
        (hall.description || "").toLowerCase().includes(keyword);

      const matchesStatus = !statusFilter || hall.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [halls, search, statusFilter]);

  const handleAddHall = () => {
    setSelectedHall(null);
    setDrawerMode("create");
    setDrawerOpen(true);
  };

  const handleEditHall = (hall) => {
    setSelectedHall(hall);
    setDrawerMode("edit");
    setDrawerOpen(true);
  };

  const handleSaveHall = async (formData) => {
    if (drawerMode === "edit" && selectedHall) {
      await updateHall(selectedHall.id, formData);
    } else {
      await addHall(formData);
    }

    setDrawerOpen(false);
    setSelectedHall(null);
  };

  return (
    <Layout>
      <div className="space-y-5">
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Halls</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage banquet halls, pricing, status, and capacity
              </p>
            </div>

            <button
              onClick={handleAddHall}
              className="h-12 px-5 rounded-xl bg-primary text-white font-medium hover:opacity-95"
            >
              + Add Hall
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by hall name, location, description"
              className="h-12 rounded-xl border border-gray-300 px-4"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 rounded-xl border border-gray-300 px-4 bg-white"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("");
              }}
              className="h-12 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <HallTable halls={filteredHalls} onEdit={handleEditHall} />

        <HallDrawer
          isOpen={drawerOpen}
          hall={selectedHall}
          mode={drawerMode}
          onClose={() => {
            setDrawerOpen(false);
            setSelectedHall(null);
          }}
          onSave={handleSaveHall}
        />
      </div>
    </Layout>
  );
}

export default Halls;
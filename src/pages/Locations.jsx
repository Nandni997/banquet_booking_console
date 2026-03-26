import { useMemo, useState } from "react";
import Layout from "../layouts/Layout";
import LocationTable from "../components/location/LocationTable";
import LocationDrawer from "../components/location/LocationDrawer";
import useLocationStore from "../store/useLocationStore";

function Locations() {
  const { locations, addLocation, updateLocation } = useLocationStore();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const filteredLocations = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return locations.filter((location) => {
      const matchesSearch =
        !keyword ||
        location.name.toLowerCase().includes(keyword) ||
        location.address.toLowerCase().includes(keyword) ||
        location.phone.toLowerCase().includes(keyword) ||
        (location.managerName || "").toLowerCase().includes(keyword);

      const matchesStatus =
        !statusFilter || location.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [locations, search, statusFilter]);

  const handleAddLocation = () => {
    setSelectedLocation(null);
    setDrawerMode("create");
    setDrawerOpen(true);
  };

  const handleEditLocation = (location) => {
    setSelectedLocation(location);
    setDrawerMode("edit");
    setDrawerOpen(true);
  };

  const handleSaveLocation = async (formData) => {
    if (drawerMode === "edit" && selectedLocation) {
      await updateLocation(selectedLocation.id, formData);
    } else {
      await addLocation(formData);
    }

    setDrawerOpen(false);
    setSelectedLocation(null);
  };

  return (
    <Layout>
      <div className="space-y-5">
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Locations</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage banquet business locations and their contact details
              </p>
            </div>

            <button
              onClick={handleAddLocation}
              className="h-12 px-5 rounded-xl bg-primary text-white font-medium hover:opacity-95"
            >
              + Add Location
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by location, address, phone, manager"
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

        <LocationTable
          locations={filteredLocations}
          onEdit={handleEditLocation}
        />

        <LocationDrawer
          isOpen={drawerOpen}
          location={selectedLocation}
          mode={drawerMode}
          onClose={() => {
            setDrawerOpen(false);
            setSelectedLocation(null);
          }}
          onSave={handleSaveLocation}
        />
      </div>
    </Layout>
  );
}

export default Locations;
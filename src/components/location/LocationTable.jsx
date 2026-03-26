function LocationTable({ locations, onEdit }) {
  const getStatusClasses = (status) => {
    switch (status) {
      case "inactive":
        return "bg-red-100 text-red-700";
      case "active":
      default:
        return "bg-emerald-100 text-emerald-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Location Name
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Address
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Phone
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Manager
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Manager Email
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Notes
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {locations.length > 0 ? (
              locations.map((location, index) => (
                <tr
                  key={location.id}
                  className={`
                    border-b last:border-b-0
                    ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  `}
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-800">
                    {location.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {location.address}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {location.phone}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {location.managerName || "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {location.managerEmail || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                        location.status
                      )}`}
                    >
                      {location.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {location.notes || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit?.(location)}
                        className="h-10 px-4 rounded-xl bg-primary text-white hover:opacity-90 transition"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No locations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LocationTable;
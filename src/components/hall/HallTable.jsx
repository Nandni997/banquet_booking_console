function HallTable({ halls, onEdit }) {
  const getStatusClasses = (status) => {
    switch (status) {
      case "inactive":
        return "bg-red-100 text-red-700";
      case "maintenance":
        return "bg-amber-100 text-amber-800";
      case "active":
      default:
        return "bg-emerald-100 text-emerald-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Hall Name
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Location
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Capacity
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Base Price
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {halls.length > 0 ? (
              halls.map((hall,index) => (
                <tr
                  key={hall.id}
                  className={`
                    border-b last:border-b-0
                    ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  `}
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-800">
                    {hall.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {hall.location}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {hall.capacity}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    ₹ {hall.basePrice}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                        hall.status
                      )}`}
                    >
                      {hall.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {hall.description || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit?.(hall)}
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
                  colSpan={7}
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No halls found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HallTable;
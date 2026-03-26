function CustomerTable({ customers, onEdit, onViewHistory }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Customer Name
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Phone
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Address
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Total Bookings
              </th>
              <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`
                    border-b last:border-b-0
                    ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  `}
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-800">
                    {customer.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {customer.phone}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {customer.email || "-"}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {customer.address || "-"}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {customer.totalBookings || 0}
                  </td>
                  <td className="px-5 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewHistory?.(customer)}
                    className="h-10 px-4 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition"
                  >
                    History
                  </button>

                  <button
                    onClick={() => onEdit?.(customer)}
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
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
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerTable;
function SummaryTable({ title, subtitle, columns = [], rows = [] }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-5 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {subtitle ? (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-white border-b">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left px-5 py-4 text-sm font-semibold text-gray-700"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="border-b last:border-b-0">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-5 py-4 text-sm text-gray-700"
                    >
                      {column.render ? column.render(row) : row[column.key] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SummaryTable;
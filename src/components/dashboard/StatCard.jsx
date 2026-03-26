function StatCard({ title, value, subtitle, color = "purple" }) {
  const colorStyles = {
    purple: "border-purple-100 bg-purple-50 text-purple-700",
    green: "border-emerald-100 bg-emerald-50 text-emerald-700",
    amber: "border-amber-100 bg-amber-50 text-amber-700",
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    red: "border-red-100 bg-red-50 text-red-700",
    gray: "border-gray-200 bg-gray-50 text-gray-700",
  };

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div
        className={`inline-flex rounded-xl border px-3 py-1 text-xs font-semibold ${
          colorStyles[color] || colorStyles.purple
        }`}
      >
        {title}
      </div>

      <div className="mt-4 text-3xl font-bold text-gray-900">
        {value}
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {subtitle}
      </div>
    </div>
  );
}

export default StatCard;
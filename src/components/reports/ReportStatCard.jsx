function ReportStatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-3 text-3xl font-bold text-gray-900">{value}</div>
      <div className="mt-2 text-sm text-gray-500">{subtitle}</div>
    </div>
  );
}

export default ReportStatCard;
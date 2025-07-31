import { useEffect, useState } from "react";

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = Math.ceil(value / (duration / 10));
    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [value]);
  return <>{count}</>;
}

export default function KPISection({ data }) {
  if (!data) return null;

  return (
    <div className="mt-12 space-y-12">
      {/* 🔷 Total Records Card */}
<div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition duration-300">
  <div className="text-center">
    <h4 className="text-sm font-semibold uppercase tracking-widest text-white/90 mb-2">
      Total Records
    </h4>
    <p className="text-5xl font-extrabold text-white drop-shadow-md">
      <AnimatedCounter value={data.totalRecords} />
    </p>
  </div>
</div>



      {/* 🔢 Dynamic KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(data.columns || {}).map(([key, val]) => (
          <div
            key={key}
            className="bg-white/90 dark:bg-white/5 border border-gray-200 dark:border-gray-700 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-md"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                📊 {key}
              </h3>
            </div>
            <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <KPI label="Average" value={val.average} />
              <KPI label="Max" value={val.max} />
              <KPI label="Min" value={val.min} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KPI({ label, value }) {
  return (
    <p className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-1">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </p>
  );
}


import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  AreaChart, Area,ScatterChart, Scatter, ZAxis
} from "recharts";
import { useState } from "react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ff6384"];

export default function ChartGallery({ data }) {

  const firstRow = data[0];
  const keys = Object.keys(firstRow);
  const numericKeys = keys.filter((key) => !isNaN(parseFloat(firstRow[key])));
  const stringKeys = keys.filter((key) => isNaN(parseFloat(firstRow[key])));
  const categoryKey = stringKeys[0] || "Category";

  const [selectedKey, setSelectedKey] = useState(numericKeys[0]);
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-12">
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          📊 Visual Analytics
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Explore your uploaded data in multiple chart formats.
        </p>
      </div>

      {/* Dropdown Selector */}
      <div className="mb-10">
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
          Select a numeric column:
        </label>
        <select
          className="w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
        >
          {numericKeys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <ChartBlock title="📦 Bar Chart">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={categoryKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={selectedKey} fill="#60a5fa" />
          </BarChart>
        </ChartBlock>

        <ChartBlock title="📈 Line Chart">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={categoryKey} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={selectedKey}
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </ChartBlock>

        <ChartBlock title="🌊 Area Chart">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={categoryKey} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={selectedKey}
              stroke="#4f46e5"
              fill="#a5b4fc"
            />
          </AreaChart>
        </ChartBlock>

<ChartBlock title="🔹 Scatter Chart">
  <ScatterChart>
    <CartesianGrid />
    <XAxis dataKey={numericKeys[0]} name={numericKeys[0]} />
    <YAxis dataKey={numericKeys[1] || numericKeys[0]} name={numericKeys[1] || numericKeys[0]} />
    <Tooltip />
    <Scatter
      name="Data Points"
      data={data}
      fill="#6366f1"
    />
  </ScatterChart>
</ChartBlock>
      </div>
    </div>
  );
}

function ChartBlock({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-5 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

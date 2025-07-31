import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function ChartSection({ data }) {
  if (!data || data.length === 0) return null;

  // Detect first numeric column
  const firstRow = data[0];
  const numericKeys = Object.keys(firstRow).filter(
    (key) => !isNaN(parseFloat(firstRow[key]))
  );
  const numericKey = numericKeys[0]; // pick first one for now

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Bar Chart - {numericKey}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={Object.keys(firstRow)[0]} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={numericKey} fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

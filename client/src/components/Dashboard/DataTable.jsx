export default function DataTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500 dark:text-gray-400 italic">
        📭 No data available
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="mt-10 overflow-x-auto rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900">
        {/* 🧠 Table Header */}
        <thead className="bg-gray-100 dark:bg-gray-800 uppercase text-xs font-semibold tracking-wider">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-5 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* 📦 Table Body */}
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
            >
              {headers.map((h) => (
                <td key={h} className="px-5 py-4">
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

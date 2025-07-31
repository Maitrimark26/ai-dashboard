import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import for navigation
import KPISection from "../components/Dashboard/KPISection";
import ChartGallery from "../components/Dashboard/ChartGallery";
import DataTable from "../components/Dashboard/DataTable";
import AISummary from "../components/Dashboard/AISummary";
import ExportButton from "../components/Dashboard/ExportButtons";
import { getAISummary } from "../services/api";

export default function Dashboard() {
  const [kpis, setKPIs] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [aiSummary, setAISummary] = useState("");
  const navigate = useNavigate(); // ✅ for page redirect

  useEffect(() => {
    const uploadedRows = localStorage.getItem("uploadedData");
    const kpiData = localStorage.getItem("kpis");

    if (uploadedRows && kpiData) {
      const parsedRows = JSON.parse(uploadedRows);
      const parsedKpis = JSON.parse(kpiData);

      setTableData(parsedRows);
      setKPIs(parsedKpis);

      getAISummary(parsedRows, parsedKpis)
        .then(setAISummary)
        .catch((err) => console.error("AI Summary error:", err));
    }
  }, []);

  return (
    <div className="p-6 space-y-6 border-b-gray-300 min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 animate-gradient-x dark:from-gray-900 dark:via-gray-800 dark:to-gray-7000">




<div id="dashboard-actions"
  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 dark:bg-gray-900/60 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
>
  {/* Dashboard Title */}
  <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
    📊 <span>AI Insights Dashboard</span>
  </h1>

  {/* Buttons Group */}
  <div className="flex flex-wrap gap-3">
    <button
      onClick={() => navigate("/upload")}
      className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow transition duration-300 flex items-center gap-2"
    >
      ⬆️ <span>Upload New CSV</span>
    </button>

    <ExportButton />
  </div>
</div>





      {/* Main Content */}
      <div id="dashboard-content" className="space-y-6 ">
        {kpis && <KPISection data={kpis} />}
        {tableData.length > 0 && <DataTable data={tableData} />}
        {tableData.length > 0 && <ChartGallery data={tableData} />}
        {aiSummary && <AISummary summary={aiSummary} />}
      </div>
    </div>
  );
}

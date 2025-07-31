
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadCSV } from "../services/api";
import { toast } from "react-toastify";

export default function FileUploader({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a CSV file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadCSV(formData);
      toast.success("CSV uploaded successfully");

      localStorage.setItem("uploadedData", JSON.stringify(res.rows));
      localStorage.setItem("kpis", JSON.stringify(res.kpis));
      setUploaded(true);

      if (onUploadComplete) onUploadComplete(res);
    } catch (err) {
      toast.error("Upload failed");
      console.error("❌ Upload error:", err);
    }
  };

  return (
    <div
      className="6"
    >
      <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-6 text-center animate-fade-in">
        {/* Animated Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2 animate-pulse">
          🚀 Unlock AI Insights
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
          Want beautiful data visualizations? <br />
          <span className="font-bold">Upload your CSV</span> and get an{" "}
          <span className="text-indigo-600">AI-powered dashboard</span> in seconds!
        </p>

        {/* Upload Input */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 dark:text-gray-300 
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300"
        >
          📂 Upload CSV
        </button>

        {/* Dashboard Button */}
        {uploaded && (
          <button
            onClick={() => {
              const isLoggedIn = localStorage.getItem("isLoggedIn");
              if (isLoggedIn) {
                navigate("/dashboard");
              } else {
                toast.error("Please login to access the dashboard");
                navigate("/login");
              }
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            📊 Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

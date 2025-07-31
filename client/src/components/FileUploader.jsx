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
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // 🔐 Check if user is logged in
    if (!token || isLoggedIn !== "true") {
      toast.error("🔐 Please login to upload your CSV");
      navigate("/login");
      return;
    }

    if (!file) {
      toast.error("📄 Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadCSV(formData);
      toast.success("✅ CSV uploaded successfully");

      // Save data in local storage
      localStorage.setItem("uploadedData", JSON.stringify(res.rows));
      localStorage.setItem("kpis", JSON.stringify(res.kpis));
      setUploaded(true);

      // Notify parent if needed
      if (onUploadComplete) onUploadComplete(res);
    } catch (err) {
      toast.error("❌ Upload failed. Please try again.");
      console.error("❌ Upload error:", err);
    }
  };

  return (
    <div className="">
      <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-6 text-center animate-fade-in">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2 animate-pulse">
          🚀 Unlock AI Insights
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
          Want beautiful data visualizations? <br />
          <span className="font-bold">Upload your CSV</span> and get an{" "}
          <span className="text-indigo-600">AI-powered dashboard</span> in seconds!
        </p>

        {/* File Input */}
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

        {/* Go to Dashboard if uploaded */}
        {uploaded && (
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            📊 Go to Dashboard
          </button>
        )}

        {/* Optional Login Button (if user is not logged in) */}
        {!localStorage.getItem("isLoggedIn") && (
          <button
            onClick={() => navigate("/login")}
            className="w-full border border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            🔐 Login to continue
          </button>
        )}
      </div>
    </div>
  );
}

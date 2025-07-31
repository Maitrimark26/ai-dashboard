
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { uploadCSV } from "../services/api";
// import { toast } from "react-toastify";

// export default function FileUploader({ onUploadComplete }) {
//   const [file, setFile] = useState(null);
//   const [uploaded, setUploaded] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleUpload = async () => {
//     if (!file) return toast.error("Please select a CSV file");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await uploadCSV(formData);
//       toast.success("CSV uploaded successfully");

//       localStorage.setItem("uploadedData", JSON.stringify(res.rows));
//       localStorage.setItem("kpis", JSON.stringify(res.kpis));
//       setUploaded(true);

//       if (onUploadComplete) onUploadComplete(res);
//     } catch (err) {
//       toast.error("Upload failed");
//       console.error("❌ Upload error:", err);
//     }
//   };

//   return (
//     <div
//       className="6"
//     >
//       <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-6 text-center animate-fade-in">
//         {/* Animated Heading */}
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2 animate-pulse">
//           🚀 Unlock AI Insights
//         </h1>
//         <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
//           Want beautiful data visualizations? <br />
//           <span className="font-bold">Upload your CSV</span> and get an{" "}
//           <span className="text-indigo-600">AI-powered dashboard</span> in seconds!
//         </p>

//         {/* Upload Input */}
//         <input
//           type="file"
//           accept=".csv"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-700 dark:text-gray-300 
//             file:mr-4 file:py-2 file:px-4
//             file:rounded-md file:border-0
//             file:text-sm file:font-semibold
//             file:bg-indigo-50 file:text-indigo-700
//             hover:file:bg-indigo-100"
//         />

//         {/* Upload Button */}
//         <button
//           onClick={handleUpload}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300"
//         >
//           📂 Upload CSV
//         </button>

//         {/* Dashboard Button */}
//         {uploaded && (
//           <button
//             onClick={() => {
//               const isLoggedIn = localStorage.getItem("isLoggedIn");
//               if (isLoggedIn) {
//                 navigate("/dashboard");
//               } else {
//                 toast.error("Please login to access the dashboard");
//                 navigate("/login");
//               }
//             }}
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
//           >
//             📊 Go to Dashboard
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadCSV } from "../services/api";
import { toast } from "react-toastify";

export default function FileUploader({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!isLoggedIn) {
      toast.warning("⚠️ Please login first to upload CSV");
      return;
    }

    if (!file) {
      toast.error("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadCSV(formData);
      toast.success("✅ CSV uploaded successfully");

      localStorage.setItem("uploadedData", JSON.stringify(res.rows));
      localStorage.setItem("kpis", JSON.stringify(res.kpis));
      setUploaded(true);

      if (onUploadComplete) onUploadComplete(res);
    } catch (err) {
      toast.error("❌ Upload failed");
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="6">
      <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-6 text-center animate-fade-in">
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
          disabled={!isLoggedIn}
          className="block w-full text-sm text-gray-700 dark:text-gray-300 
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100 disabled:opacity-50"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!isLoggedIn}
          className={`w-full ${
            isLoggedIn
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300`}
        >
          📂 Upload CSV
        </button>

        {/* 👇 Show Login Button if NOT logged in */}
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            🔐 Login to Continue
          </button>
        )}

        {/* Dashboard Button */}
        {uploaded && isLoggedIn && (
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            📊 Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}


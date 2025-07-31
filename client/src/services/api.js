// import axios from "axios";

// // Base URL - change when deploying to production
// const BASE_URL = "http://localhost:5000/api";

// // Auth APIs
// export const loginUser = async (form) => {
//   const res = await axios.post(`${BASE_URL}/auth/login`, form);
//   return res.data;
// };

// export const registerUser = async (form) => {
//   const res = await axios.post(`${BASE_URL}/auth/register`, form);
//   return res.data;
// };
// export const uploadCSV = async (formData) => {
//   const token = localStorage.getItem("token");
//   const res = await axios.post(`${BASE_URL}/upload`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// };
// export const getKPIData = async () => {
//   const token = localStorage.getItem("token");
//   const res = await axios.get(`${BASE_URL}/dashboard/kpi`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return res.data;
// };

// export const getAISummary = async (rows, kpis) => {
//   const res = await axios.post(`${BASE_URL}/ai/summary`, { rows, kpis });
//   return res.data.summary;
// };

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerUser(form);
      console.log("📦 Register API Response:", data);

      if (data?.token || data?.message?.toLowerCase().includes("success")) {
        toast.success("✅ Registered successfully, now login!");
        navigate("/login"); // Go to login page
      } else {
        toast.error("❌ Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const msg =
        err?.response?.data?.message ||
        "⚠️ Something went wrong during registration.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white">
          Create Your Account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={form.email}
              required
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={form.password}
              required
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          } text-white font-semibold py-2 rounded-lg transition duration-300`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already registered?{" "}
          <Link to="/login" className="text-green-600 hover:underline dark:text-green-400">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

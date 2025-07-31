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

// import axios from "axios";

// // ✅ Picks from Netlify environment variable
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Auth APIs
// export const loginUser = async (form) => {
//   const res = await axios.post(${BASE_URL}/auth/login, form);
//   return res.data;
// };

// export const registerUser = async (form) => {
//   const res = await axios.post(${BASE_URL}/auth/register, form);
//   return res.data;
// };

// export const uploadCSV = async (formData) => {
//   const token = localStorage.getItem("token");
//   const res = await axios.post(${BASE_URL}/upload, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: Bearer ${token},
//     },
//   });
//   return res.data;
// };

// export const getKPIData = async () => {
//   const token = localStorage.getItem("token");
//   const res = await axios.get(${BASE_URL}/dashboard/kpi, {
//     headers: { Authorization: Bearer ${token} },
//   });
//   return res.data;
// };

// export const getAISummary = async (rows, kpis) => {
//   const res = await axios.post(${BASE_URL}/ai/summary, { rows, kpis });
//   return res.data.summary;
// };
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Auth APIs
export const loginUser = async (form) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, form);
  return res.data;
};

export const registerUser = async (form) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, form);
  return res.data;
};

export const uploadCSV = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // ✅ Corrected
    },
  });
  return res.data;
};

export const getKPIData = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/dashboard/kpi`, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Corrected
    },
  });
  return res.data;
};

export const getAISummary = async (rows, kpis) => {
  const res = await axios.post(`${BASE_URL}/ai/summary`, { rows, kpis });
  return res.data.summary;
};


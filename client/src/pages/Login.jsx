// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../services/api";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const { setUser } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = await loginUser(form);
//     if (data.token) {
//       setUser(data.user);
//       localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white">
//           Welcome Back 👋
//         </h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Email
//             </label>
//             <input
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Password
//             </label>
//             <input
//               name="password"
//               type="password"
//               placeholder="Enter your password"
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
//         >
//           Login
//         </button>

//         {/* 👇 Register link here */}
//         <p className="text-center text-sm text-gray-600 dark:text-gray-400">
//           Not registered?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
//             Create an account
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form);

      if (data?.token) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        toast.success("✅ Logged in successfully");
        navigate("/dashboard");
      } else {
        toast.error("❌ Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("⚠️ Login failed. Please check email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white">
          Welcome Back 👋
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
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
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold py-2 rounded-lg transition duration-300`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Not registered?{" "}
          <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

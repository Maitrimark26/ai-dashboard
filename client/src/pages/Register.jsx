// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { registerUser } from "../services/api";
// import { useAuth } from "../context/AuthContext";

// export default function Register() {
//   const { setUser } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = await registerUser(form);
//     if (data.token) {
//       setUser(data.user);
//       localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white">
//           Create Your Account
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
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
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
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
//         >
//           Register
//         </button>

//         {/* 👇 Already registered? link */}
//         <p className="text-center text-sm text-gray-600 dark:text-gray-400">
//           Already registered?{" "}
//           <Link to="/login" className="text-green-600 hover:underline dark:text-green-400">
//             Login here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Register() {
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
      const data = await registerUser(form);

      if (data?.token) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        toast.success("✅ Registered successfully");
        navigate("/dashboard");
      } else {
        toast.error("❌ Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const msg =
        err?.response?.data?.message || "⚠️ Something went wrong during registration.";
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

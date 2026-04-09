import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-[40%] right-[20%] w-48 h-48 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <HiSparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Taskly
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
            Sign in to continue to your workspace
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email address
              </label>
              <motion.div
                animate={{ scale: focused === "email" ? 1.01 : 1 }}
                transition={{ duration: 0.15 }}
                className={`relative flex items-center rounded-xl border-2 transition-all duration-200 ${
                  focused === "email"
                    ? "border-violet-500 bg-violet-50/50 dark:bg-violet-950/20"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                }`}
              >
                <FiMail className={`absolute left-3.5 w-4 h-4 transition-colors ${focused === "email" ? "text-violet-500" : "text-slate-400"}`} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm rounded-xl"
                />
              </motion.div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <motion.div
                animate={{ scale: focused === "password" ? 1.01 : 1 }}
                transition={{ duration: 0.15 }}
                className={`relative flex items-center rounded-xl border-2 transition-all duration-200 ${
                  focused === "password"
                    ? "border-violet-500 bg-violet-50/50 dark:bg-violet-950/20"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                }`}
              >
                <FiLock className={`absolute left-3.5 w-4 h-4 transition-colors ${focused === "password" ? "text-violet-500" : "text-slate-400"}`} />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm rounded-xl"
                />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </motion.button>
              </motion.div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign in
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-violet-600 dark:text-violet-400 font-semibold hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              >
                Create one free
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

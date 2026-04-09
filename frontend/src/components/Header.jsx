import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Header() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("See you soon!");
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/30">
            <HiSparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Taskly
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* User avatar + name */}
          <div className="hidden sm:flex items-center gap-2.5 mr-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {user?.name}
            </span>
          </div>

          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: 15 }}
            onClick={toggle}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle theme"
          >
            <motion.div
              key={dark ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {dark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </motion.div>
          </motion.button>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
          >
            <FiLogOut className="w-4 h-4" />
            <span className="hidden sm:block">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

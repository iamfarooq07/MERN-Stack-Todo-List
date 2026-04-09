import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiInbox } from "react-icons/fi";

const states = {
  all: {
    icon: FiInbox,
    title: "No tasks yet",
    sub: "Add your first task above to get started.",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  active: {
    icon: FiCheckCircle,
    title: "All caught up!",
    sub: "No active tasks. You're on top of everything.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  completed: {
    icon: FiClock,
    title: "Nothing completed yet",
    sub: "Complete a task and it'll show up here.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
};

export default function EmptyState({ filter }) {
  const state = states[filter] || states.all;
  const Icon = state.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
        className={`w-16 h-16 rounded-2xl ${state.bg} flex items-center justify-center mb-5`}
      >
        <Icon className={`w-8 h-8 ${state.color}`} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-700 dark:text-slate-300 font-semibold text-base"
      >
        {state.title}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-sm text-slate-400 dark:text-slate-500 mt-1.5 max-w-xs"
      >
        {state.sub}
      </motion.p>
    </motion.div>
  );
}

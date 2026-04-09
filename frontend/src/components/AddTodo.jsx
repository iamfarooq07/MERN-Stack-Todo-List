import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiCalendar, FiChevronDown } from "react-icons/fi";

const priorities = ["low", "medium", "high"];

const priorityConfig = {
  low: {
    active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
  medium: {
    active: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    dot: "bg-amber-500",
  },
  high: {
    active: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border-red-200 dark:border-red-800",
    dot: "bg-red-500",
  },
};

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text: text.trim(), priority, dueDate: dueDate || null });
    setText("");
    setDueDate("");
    setPriority("medium");
    setShowOptions(false);
  };

  return (
    <motion.div
      animate={{
        boxShadow: focused
          ? "0 0 0 3px rgba(139, 92, 246, 0.15), 0 4px 24px rgba(139, 92, 246, 0.1)"
          : "0 1px 3px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 px-4 py-3.5">
          {/* Plus icon */}
          <motion.div
            animate={{ rotate: focused ? 45 : 0, scale: focused ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/25"
          >
            <FiPlus className="w-4 h-4 text-white" strokeWidth={2.5} />
          </motion.div>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => { setFocused(true); setShowOptions(true); }}
            onBlur={() => setFocused(false)}
            placeholder="Add a new task..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
          />

          <AnimatePresence>
            {text.trim() && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md shadow-violet-500/25 flex-shrink-0"
              >
                Add task
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowOptions(!showOptions)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0"
          >
            <motion.div animate={{ rotate: showOptions ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <FiChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Options panel */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center">
                {/* Priority */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-medium mr-1">Priority:</span>
                  {priorities.map((p) => (
                    <motion.button
                      key={p}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPriority(p)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize border transition-all ${
                        priority === p
                          ? priorityConfig[p].active
                          : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${priority === p ? priorityConfig[p].dot : "bg-slate-300 dark:bg-slate-600"}`} />
                      {p}
                    </motion.button>
                  ))}
                </div>

                {/* Due date */}
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <FiCalendar className="w-3.5 h-3.5" />
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="text-xs bg-transparent border-none outline-none text-slate-600 dark:text-slate-300 cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}

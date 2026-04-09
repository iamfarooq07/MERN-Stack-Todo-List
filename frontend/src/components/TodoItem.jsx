import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiCalendar } from "react-icons/fi";
import { RiDraggable } from "react-icons/ri";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const priorityConfig = {
  low: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  medium: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  high: {
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    dot: "bg-red-500",
  },
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: todo._id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  const saveEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo._id, { text: editText.trim() });
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    setEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo._id), 200);
  };

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();
  const cfg = priorityConfig[todo.priority] || priorityConfig.medium;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{
        opacity: isDeleting ? 0 : isDragging ? 0.6 : 1,
        y: 0,
        scale: isDragging ? 1.02 : 1,
        x: isDeleting ? -20 : 0,
      }}
      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex items-start gap-3 p-4 rounded-2xl border transition-all duration-200 ${
        isDragging
          ? "bg-white dark:bg-slate-800 border-violet-300 dark:border-violet-700 shadow-xl z-50"
          : todo.completed
          ? "bg-slate-50/80 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/50"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
      }`}
    >
      {/* Priority accent line */}
      {!todo.completed && (
        <div className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full ${cfg.dot}`} />
      )}

      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="mt-0.5 text-slate-200 dark:text-slate-700 hover:text-slate-400 dark:hover:text-slate-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        aria-label="Drag to reorder"
      >
        <RiDraggable className="w-4 h-4" />
      </button>

      {/* Checkbox */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onToggle(todo._id, !todo.completed)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          todo.completed
            ? "bg-gradient-to-br from-violet-500 to-indigo-600 border-transparent shadow-md shadow-violet-500/30"
            : "border-slate-300 dark:border-slate-600 hover:border-violet-400 dark:hover:border-violet-500"
        }`}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        <AnimatePresence>
          {todo.completed && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
            >
              <FiCheck className="w-3 h-3 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-center"
          >
            <input
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") cancelEdit();
              }}
              className="flex-1 text-sm bg-transparent border-b-2 border-violet-500 outline-none text-slate-900 dark:text-white pb-0.5 font-medium"
            />
            <motion.button whileTap={{ scale: 0.9 }} onClick={saveEdit} className="text-violet-600 hover:text-violet-700 transition-colors">
              <FiCheck className="w-4 h-4" strokeWidth={2.5} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={cancelEdit} className="text-slate-400 hover:text-slate-600 transition-colors">
              <FiX className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ) : (
          <>
            <p className={`text-sm font-medium break-words leading-relaxed transition-all duration-300 ${
              todo.completed
                ? "line-through text-slate-400 dark:text-slate-500"
                : "text-slate-800 dark:text-slate-200"
            }`}>
              {todo.text}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {todo.priority && (
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${cfg.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {todo.priority}
                </span>
              )}
              {todo.dueDate && (
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  isOverdue ? "text-red-500 dark:text-red-400" : "text-slate-400 dark:text-slate-500"
                }`}>
                  <FiCalendar className="w-3 h-3" />
                  {formatDate(todo.dueDate)}
                  {isOverdue && <span className="ml-0.5">· Overdue</span>}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      {!editing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setEditing(true); setEditText(todo.text); }}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-lg transition-all"
            aria-label="Edit task"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
            aria-label="Delete task"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

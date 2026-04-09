import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import toast from "react-hot-toast";
import api from "../api/axios";
import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import EmptyState from "../components/EmptyState";
import { FiSearch, FiX, FiTrash2 } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";

const FILTERS = ["all", "active", "completed"];

function SkeletonCard() {
  return (
    <div className="h-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse" />
  );
}

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async ({ text, priority, dueDate }) => {
    try {
      const res = await api.post("/todos", { text, priority, dueDate });
      setTodos((prev) => [res.data, ...prev]);
      toast.success("Task added");
    } catch {
      toast.error("Failed to add task");
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await api.put(`/todos/${id}`, { completed });
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch {
      toast.error("Failed to update task");
    }
  };

  const editTodo = async (id, updates) => {
    try {
      const res = await api.put(`/todos/${id}`, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      toast.success("Task updated");
    } catch {
      toast.error("Failed to update task");
    }
  };

  const deleteTodo = async (id) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.delete(`/todos/${id}`);
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
      fetchTodos();
    }
  };

  const clearCompleted = async () => {
    const count = todos.filter((t) => t.completed).length;
    if (!count) return;
    setTodos((prev) => prev.filter((t) => !t.completed));
    try {
      await api.delete("/todos/clear-completed");
      toast.success(`Cleared ${count} task${count > 1 ? "s" : ""}`);
    } catch {
      toast.error("Failed to clear completed");
      fetchTodos();
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = todos.findIndex((t) => t._id === active.id);
    const newIndex = todos.findIndex((t) => t._id === over.id);
    const reordered = arrayMove(todos, oldIndex, newIndex);
    setTodos(reordered);
    try {
      await Promise.all(
        reordered.map((todo, i) => api.put(`/todos/${todo._id}`, { order: i }))
      );
    } catch {
      fetchTodos();
    }
  };

  const filtered = useMemo(() => {
    return todos
      .filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      })
      .filter(
        (t) =>
          !search || t.text.toLowerCase().includes(search.toLowerCase())
      );
  }, [todos, filter, search]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <HiOutlineClipboardList className="w-6 h-6 text-violet-500" />
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              My Tasks
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-9">
            {activeCount} remaining · {completedCount} completed
          </p>

          {/* Progress bar */}
          {totalCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 ml-9"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Progress
                </span>
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                  {progressPct}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { label: "Total", value: totalCount, color: "text-slate-700 dark:text-slate-300", bg: "bg-white dark:bg-slate-900" },
            { label: "Active", value: activeCount, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/40" },
            { label: "Done", value: completedCount, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`${bg} rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center`}>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Add Todo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-4"
        >
          <AddTodo onAdd={addTodo} />
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative mb-4"
        >
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 dark:focus:border-violet-600 transition-all text-sm"
          />
          <AnimatePresence>
            {search && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Filter tabs + clear */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="flex items-center justify-between mb-5"
        >
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl p-1">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilter(f)}
                className={`relative px-3.5 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                  filter === f
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {filter === f && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-lg shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {f}
                  {f === "active" && activeCount > 0 && (
                    <span className="text-xs bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded-full font-bold">
                      {activeCount}
                    </span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {completedCount > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={clearCompleted}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                Clear done
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Todo list */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <SkeletonCard />
              </motion.div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState filter={search ? "all" : filter} />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filtered.map((t) => t._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {filtered.map((todo) => (
                    <TodoItem
                      key={todo._id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          </DndContext>
        )}
      </main>
    </div>
  );
}

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import { HiSparkles } from "react-icons/hi2";
import { FiCheck } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const DEMO_TASKS = [
  { text: "Design new dashboard UI", done: true },
  { text: "Push code to GitHub", done: true },
  { text: "Review backend API routes", done: false },
  { text: "Plan tomorrow's sprint", done: false },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-0 left-[-10%] w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-[-10%] w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-[50%] left-[50%] w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      {/* Navbar */}
      <header className="relative z-50 border-b border-white/8 backdrop-blur-xl bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <HiSparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
              Taskly
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/8 transition-all"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-105"
            >
              Get started
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold mb-6"
          >
            <HiSparkles className="w-3.5 h-3.5" />
            Smart Task Management
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight"
          >
            Organize your day with{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
              Taskly
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-6 text-slate-400 text-lg leading-relaxed max-w-lg"
          >
            A clean, fast, and beautiful todo app built for people who want to
            get things done without the clutter.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-semibold text-sm shadow-xl shadow-violet-500/25 hover:scale-105 transition-all"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 font-semibold text-sm transition-all"
            >
              Sign in
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-10 flex gap-8 text-sm text-slate-500"
          >
            {[["10K+", "Tasks done"], ["5K+", "Users"], ["99%", "Uptime"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-xl font-black text-white">{num}</p>
                <p>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-3xl blur-2xl" />
          <div className="relative bg-slate-900/80 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">Today's Tasks</h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 font-semibold">
                4 tasks
              </span>
            </div>

            <div className="space-y-3">
              {DEMO_TASKS.map((task, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    task.done
                      ? "bg-slate-800/40 border-white/5 opacity-60"
                      : "bg-slate-800/70 border-white/8 hover:border-violet-500/30"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    task.done
                      ? "bg-gradient-to-br from-violet-500 to-indigo-600 border-transparent"
                      : "border-slate-600"
                  }`}>
                    {task.done && <FiCheck className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm ${task.done ? "line-through text-slate-500" : "text-slate-200"}`}>
                    {task.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4">
                <p className="text-xs text-slate-400 font-medium">Completed</p>
                <p className="text-2xl font-black mt-1 text-violet-400">2</p>
              </div>
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4">
                <p className="text-xs text-slate-400 font-medium">Remaining</p>
                <p className="text-2xl font-black mt-1 text-indigo-400">2</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-violet-400 font-semibold text-sm mb-3 uppercase tracking-widest">Features</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Everything you need to stay productive
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <CheckCircle2 className="w-7 h-7 text-violet-400" />,
              title: "Task Tracking",
              desc: "Create, update, and complete your daily tasks with ease and style.",
              bg: "bg-violet-500/10 border-violet-500/20",
            },
            {
              icon: <Clock3 className="w-7 h-7 text-indigo-400" />,
              title: "Due Dates & Priority",
              desc: "Set deadlines and priority levels to stay ahead of what matters.",
              bg: "bg-indigo-500/10 border-indigo-500/20",
            },
            {
              icon: <LayoutDashboard className="w-7 h-7 text-purple-400" />,
              title: "Smart Dashboard",
              desc: "Get a clear overview of all your tasks with filters and search.",
              bg: "bg-purple-500/10 border-purple-500/20",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`${item.bg} border rounded-3xl p-7 backdrop-blur-xl`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 overflow-hidden p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/15 to-indigo-600/15" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Ready to take control of your tasks?
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Join Taskly and turn your messy to-do list into an organized, productive workflow.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-semibold shadow-xl shadow-violet-500/25 hover:scale-105 transition-all"
              >
                Get started free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/8 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <HiSparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-sm bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
              Taskly
            </span>
          </div>
          <p className="text-slate-500 text-xs">© 2026 Taskly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

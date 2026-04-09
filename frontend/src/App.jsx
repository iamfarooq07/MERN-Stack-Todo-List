import { Routes, Route, Navigate, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./Home";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (user === undefined) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  if (user === undefined) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--toast-bg, #fff)",
            color: "var(--toast-color, #111)",
            border: "1px solid var(--toast-border, #e5e7eb)",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: "500",
            padding: "10px 14px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            index
            element={
              <GuestRoute>
                <PageWrapper><Home /></PageWrapper>
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <PageWrapper><Login /></PageWrapper>
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <PageWrapper><Signup /></PageWrapper>
              </GuestRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageWrapper><Dashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

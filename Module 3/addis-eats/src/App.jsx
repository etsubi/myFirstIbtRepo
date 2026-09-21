import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./App.css";

import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSkeleton from "./components/LoadingSkeleton";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

import RequireAuth from "./auth/RequireAuth";

const Checkout = lazy(() => import("./pages/checkout"));

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="menu"
              element={
                <ErrorBoundary>
                  <Menu />
                </ErrorBoundary>
              }
            />

            <Route path="menu/:id" element={<DishDetail />} />

            <Route path="signin" element={<SignIn />} />

            <Route
              path="checkout"
              element={
                <RequireAuth>
                  <Suspense fallback={<LoadingSkeleton />}>
                    <Checkout />
                  </Suspense>
                </RequireAuth>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

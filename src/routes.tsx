// routes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Addresses from "./pages/Addresses";
import Dashboard from "./pages/Dashboard";
import Receivers from "./pages/Receivers";
import Finances from "./pages/Finances";
import Settings from "./pages/Settings";
import AddOrderPage from "./pages/AddOrderPage";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/receivers" element={<Receivers/>} />
        <Route path="/finance" element={<Finances />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add" element={<AddOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
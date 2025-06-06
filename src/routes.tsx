import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Addresses from "./pages/Addresses";
import Dashboard from "./pages/Dashboard";
import Receivers from "./pages/Receivers";
import Finances from "./pages/Finances";
import Settings from "./pages/Settings";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register/>} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/receivers" element={<Receivers/>} />
        <Route path="/finance" element={<Finances />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
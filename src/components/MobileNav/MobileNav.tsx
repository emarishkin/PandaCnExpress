
import '../MobileNav/MobileNav.css'
import { useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiMapPin, FiUsers, FiCreditCard, FiSettings } from "react-icons/fi";

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Главная", icon: <FiHome />, path: "/dashboard" },
    { label: "Адреса", icon: <FiMapPin />, path: "/addresses" },
    { label: "Получатели", icon: <FiUsers />, path: "/receivers" },
    { label: "Финансы", icon: <FiCreditCard />, path: "/finance" },
    { label: "Настройки", icon: <FiSettings />, path: "/settings" },
  ];

  return (
    <nav className="mobile-nav">
      {menu.map((item) => (
        <button
          key={item.path}
          className={`nav-btn ${location.pathname === item.path ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

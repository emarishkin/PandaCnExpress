import { useState } from "react";
import '../Sidebar/Sidebar.css'
import { useLocation, useNavigate } from "react-router-dom";
import siderImg from '/siderImg.png'
import logo from '/logo.png'
import {
  FiHome,
  FiMapPin,
  FiUsers,
  FiCreditCard,
  FiSettings,
} from "react-icons/fi";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Главная", icon: <FiHome />, path: "/dashboard" },
    { label: "Адреса", icon: <FiMapPin />, path: "/addresses" },
    { label: "Получатели", icon: <FiUsers />, path: "/receivers" },
    { label: "Финансы", icon: <FiCreditCard />, path: "/finance" },
    { label: "Настройки", icon: <FiSettings />, path: "/settings" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src={logo} alt="Panda Express Logo" />
          <span className="logo-text">PANDA EXPRESS</span>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul>
          {menu.map((item) => (
            <li
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
              onClick={() => navigate(item.path)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="user-id-box">
        <img src={siderImg} alt="User ID" />
        <p>
          <strong>Ваш ID: B-4437</strong>
        </p>
        <p className="note">Указывайте ID при заказе</p>
      </div>
    </aside>
  );
}
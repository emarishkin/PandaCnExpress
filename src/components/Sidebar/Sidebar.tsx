import { useState, type FC } from "react";
import "./Sidebar.css";

export const Sidebar:FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">PANDA EXPRESS</div>

        <button className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Открыть меню">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li className="active">Главная</li>
          <li>Мои адреса</li>
          <li>Получатели</li>
          <li>Финансы</li>
          <li>Настройки</li>
        </ul>
      </nav>

      <div className="user-id-box">
        <p><strong>Ваш ID: B-4437</strong></p>
        <p className="note">Указывайте идентификатор при заказе</p>
      </div>
    </aside>
  );
}

import  { type FC } from "react";
import "./MobileNav.css";

export const MobileNav:FC = () => {
  return (
    <nav className="mobile-nav">
      <button className="nav-btn active">Главная</button>
      <button className="nav-btn">Адреса</button>
      <button className="nav-btn">Получатели</button>
      <button className="nav-btn">Финансы</button>
      <button className="nav-btn">Настройки</button>
    </nav>
  );
}
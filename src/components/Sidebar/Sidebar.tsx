import type { FC } from "react";
import "../Sidebar/Sidebar.css";

export const Sidebar:FC = () => {
  return (
    <aside className="sidebar">
      <div className="logo">PANDA EXPRESS</div>

      <nav className="nav">
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
        <p className="note">Обязательно указывайте свой идентификатор при заказе.</p>
      </div>
    </aside>
  );
}

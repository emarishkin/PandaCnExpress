import type { FC } from "react";
import logoPanda from '/logoPanda.svg';
import { Link, useLocation } from "react-router-dom";
import '../style/sider.css'

interface SiderProps {}

export const Sider: FC<SiderProps> = () => {
  const location = useLocation();
  
  // Определяем активный путь
  const isActive = (path: string) => location.pathname === path;

  return (
    <section className="siderSection">
      <div className="container">
        <div className="sider-board">
          <img src={logoPanda} alt="Logo" />
          <div className="sider-nuv">
            <ul>
              <li>
                <Link to='/' className={isActive('/') ? 'active' : ''}>
                  Главная
                </Link>
              </li>
              <li>
                <Link to='/addresses' className={isActive('/addresses') ? 'active' : ''}>
                  Мои адреса
                </Link>
              </li>
              <li>
                <Link to='/recipients' className={isActive('/recipients') ? 'active' : ''}>
                  Получатели
                </Link>
              </li>
              <li>
                <Link to='/finance' className={isActive('/finance') ? 'active' : ''}>
                  Финансы
                </Link>
              </li>
              <li>
                <Link to='/settings' className={isActive('/settings') ? 'active' : ''}>
                  Настройки
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
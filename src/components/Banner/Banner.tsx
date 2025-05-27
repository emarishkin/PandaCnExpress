import type { FC } from 'react';
import '../Banner/Banner.css'
import podarok from '/podarok.svg'

export const Banner:FC = () => {
  return (
    <div className="banner">
      <div className="banner-left">
        <img src={podarok} alt="Gift" className="banner-icon" />
        <div className="banner-text">
          <h3>Пригласите друга и получите бонусы</h3>
          <p>Рекомендуйте наш сервис и получайте бонусы на счёт за каждого друга.</p>
        </div>
      </div>
      <button className="banner-button">Пригласить друга</button>
    </div>
  );
}

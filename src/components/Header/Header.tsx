import  { useEffect, useState, type FC } from "react";
import axios from "axios";
import '../Header/Header.css'

export const Header:FC = ()  => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5187/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <span className="header-title">Главная</span>
      </div>
      <div className="header-right">
        <div className="header-bonus">
          Бонусы: <strong>$0</strong>
        </div>
        {user && (
          <div className="header-user">
            <span>{user.name} {user.surname}</span>
            <img src="/avatar.png" alt="avatar" className="avatar" />
          </div>
        )}
      </div>
    </div>
  );
}

// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/register.css";
import logoPanda from "/logoPanda.svg";
import logo from "/logo.png";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [status, setStatus] = useState("no");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Пароли не совпадают");
      return;
    }

    // Тут будет запрос на API

    alert("Регистрация успешна!");
    navigate("/auth");
  };

  return (
    <section className="login">
      <div className="logo-panda">
        <img src={logoPanda} alt="панда-лого" />
      </div>

      <div className="container1">
       
        <div className="login-form">
          <div className="form-content">
            <h3 className="login-title">Создать аккаунт</h3>
            <p className="head-text">
              Добро пожаловать в <span className="green-text">PandaCnExpress</span>
            </p>

            <form onSubmit={handleRegister} className="form-box">
                <input
                   type="text"
                   placeholder="Имя"
                   className="register-input"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required
                />

                <input
                   type="text"
                   placeholder="Фамилия"
                   className="register-input"
                   value={surname}
                   onChange={(e) => setSurname(e.target.value)}
                   required
                />

                <select
                   className="register-input"
                   value={status}
                   onChange={(e) => setStatus(e.target.value)}
                   required
                >  
                   <option value="no">не выбран</option>
                   <option value="individual">Физическое лицо</option>
                   <option value="company">Юридическое лицо</option>
                </select>

                <input
                   type="email"
                   placeholder="Email"
                   className="register-input"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                />

                <input
                   type="tel"
                   placeholder="Телефон"
                   className="register-input"
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                   required
                />

                <input
                   type="text"
                   placeholder="Страна"
                   className="register-input"
                   value={country}
                   onChange={(e) => setCountry(e.target.value)}
                   required
                />

                <input
                   type="password"
                   placeholder="Пароль"
                   className="register-input"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                />
                <input
                   type="password"
                   placeholder="Повторите пароль"
                   className="register-input"
                   value={confirm}
                   onChange={(e) => setConfirm(e.target.value)}
                   required
                />
                 
                <label className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                />
                 Я согласен с <a href="#">политикой конфиденциальности</a>
                </label>

                <button type="submit" className="register-button">
                    Зарегистрироваться
                </button>

                <p className="register-link">
                   Уже есть аккаунт? <Link to='/'>Войти</Link>
                 </p>
            </form>
          </div>
        </div>

        
        <div className="auth-banner">
          <img
            className="banner-img"
            src={logo}
            alt="самолет"
          />
          <div>
            <h3 className="banner-title">
              PandaCn<span className="banner-highlight">Express</span> — ваш надежный
              партнёр по работе с Китаем
            </h3>
            <p className="banner-text">
              Наш путь начался в 2021 году, когда РФ возобновила грузосообщение с Китаем после пандемии COVID-19 ..
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

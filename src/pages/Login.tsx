import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";
import logoPanda from "/logoPanda.svg";
import logo from "/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "test@test.com" && password === "123456") {
      navigate("/dashboard");
    } else {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <section className="login">
      <div className="logo-panda">
        <img src={logoPanda} alt="панда-лого" />
      </div>

      <div className="container">
        {/* Левая часть — форма */}
        <div className="login-form">
          <div className="form-content">
            <h3 className="login-title">Личный кабинет</h3>
            <p className="head-text">
              Добро пожаловать в <span className="green-text">PandaCnExpress</span>
            </p>

            <form onSubmit={handleLogin} className="form-box">
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Пароль"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={check}
                    onChange={() => setCheck(!check)}
                  />
                  Запомнить
                </label>
                <a className="forgot-link" href="#">Забыли пароль?</a>
              </div>

              <button type="submit" className="login-button">Войти</button>

              <p className="register-link">
                Нет аккаунта? <a href="#">Зарегистрироваться</a>
              </p>
            </form>
          </div>
        </div>

        {/* Правая часть — баннер (виден только на desktop) */}
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
              Наш путь начался в 2021 году, когда РФ возобновила грузосообщение с Китаем после пандемии COVID-19 .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
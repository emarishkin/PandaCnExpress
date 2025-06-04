import  { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import '../style/Settings.css';

export default function Settings() {
  const [tab, setTab] = useState<"info" | "password">("info");

  return (
    <DashboardLayout>
      <div className="settings">
        <div className="settings-tabs">
          <button
            className={tab === "info" ? "active" : ""}
            onClick={() => setTab("info")}
          >
            Поменять данные
          </button>
          <button
            className={tab === "password" ? "active" : ""}
            onClick={() => setTab("password")}
          >
            Поменять пароль
          </button>
        </div>

        {tab === "info" ? <UserInfoForm /> : <PasswordForm />}
      </div>
    </DashboardLayout>
  );
}

function UserInfoForm() {
  const [addresses, setAddresses] = useState([
    {
      country: "",
      region: "",
      city: "",
      street: "",
      house: "",
      zip: "",
      landmark: "",
      apartment: "",
      isPrimary: true,
    },
  ]);

  const handleChange = (index: number, field: string, value: string | boolean) => {
    const updated = [...addresses];
    updated[index] = { ...updated[index], [field]: value };
    setAddresses(updated);
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      {
        country: "",
        region: "",
        city: "",
        street: "",
        house: "",
        zip: "",
        landmark: "",
        apartment: "",
        isPrimary: false,
      },
    ]);
  };

  return (
    <form className="user-form">
      <h3>Ваши данные</h3>

      <div className="form-grid">
        <input placeholder="Ф.И.О" />
        <input placeholder="Телефон" />
        <input placeholder="Серия и номер паспорта" />
        <input placeholder="Электронная почта" />
      </div>

      <h4 style={{ marginTop: "20px" }}>Адреса</h4>

      {addresses.map((addr, index) => (
        <div key={index} className="form-grid">
          <input
            placeholder="Страна"
            value={addr.country}
            onChange={(e) => handleChange(index, "country", e.target.value)}
          />
          <input
            placeholder="Область (регион)"
            value={addr.region}
            onChange={(e) => handleChange(index, "region", e.target.value)}
          />
          <input
            placeholder="Город"
            value={addr.city}
            onChange={(e) => handleChange(index, "city", e.target.value)}
          />
          <input
            placeholder="Улица"
            value={addr.street}
            onChange={(e) => handleChange(index, "street", e.target.value)}
          />
          <input
            placeholder="Дом"
            value={addr.house}
            onChange={(e) => handleChange(index, "house", e.target.value)}
          />
          <input
            placeholder="Квартира"
            value={addr.apartment}
            onChange={(e) => handleChange(index, "apartment", e.target.value)}
          />
          <input
            placeholder="Ориентир"
            value={addr.landmark}
            onChange={(e) => handleChange(index, "landmark", e.target.value)}
          />
          <input
            placeholder="ZIP код (индекс)"
            value={addr.zip}
            onChange={(e) => handleChange(index, "zip", e.target.value)}
          />

          <label className="switcher">
            <input
              type="checkbox"
              checked={addr.isPrimary}
              onChange={(e) => handleChange(index, "isPrimary", e.target.checked)}
            />
            Основной
          </label>
        </div>
      ))}

      <button type="button" className="add-link" onClick={addAddress}>
        + Добавить новый адрес
      </button>

      <div className="action-buttons">
        <button type="reset" className="cancel">
          Сбросить
        </button>
        <button type="submit" className="save">
          Сохранить
        </button>
      </div>
    </form>
  );
}


function PasswordForm() {
  return (
    <form className="user-form">
      <h3>Смена пароля</h3>
      <div className="form-grid">
        <input placeholder="Текущий пароль" type="password" />
        <input placeholder="Новый пароль" type="password" />
        <input placeholder="Повторите пароль" type="password" />
      </div>
      <div className="action-buttons">
        <button type="reset" className="cancel">
          Сбросить
        </button>
        <button type="submit" className="save">
          Сохранить
        </button>
      </div>
    </form>
  );
}

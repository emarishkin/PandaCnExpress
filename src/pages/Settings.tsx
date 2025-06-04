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
  const initialState = {
    name: "",
    phone: "",
    passport: "",
    email: "",
    addresses: [
      {
        country: "",
        region: "",
        city: "",
        street: "",
        house: "",
        apartment: "",
        zip: "",
        landmark: "",
        isPrimary: true,
      },
    ],
  };

  const [form, setForm] = useState(initialState);

  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index: number, field: string, value: string | boolean) => {
    const updated = [...form.addresses];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, addresses: updated });
  };

  const addAddress = () => {
    setForm({
      ...form,
      addresses: [
        ...form.addresses,
        {
          country: "",
          region: "",
          city: "",
          street: "",
          house: "",
          apartment: "",
          zip: "",
          landmark: "",
          isPrimary: false,
        },
      ],
    });
  };

  const removeAddress = (index: number) => {
    const updated = [...form.addresses];
    updated.splice(index, 1);
    setForm({ ...form, addresses: updated });
  };

  const resetForm = () => {
    setForm(initialState);
  };

  const saveForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Сохранённые данные:", form);
    alert("Данные сохранены (в консоли)");
  };

  return (
    <form className="user-form" onSubmit={saveForm}>
      <h3>Ваши данные</h3>
      <div className="form-grid">
        <input
          name="name"
          placeholder="Ф.И.О"
          value={form.name}
          onChange={handleMainChange}
        />
        <input
          name="phone"
          placeholder="Телефон"
          value={form.phone}
          onChange={handleMainChange}
        />
        <input
          name="passport"
          placeholder="Серия и номер паспорта"
          value={form.passport}
          onChange={handleMainChange}
        />
        <input
          name="email"
          placeholder="Электронная почта"
          value={form.email}
          onChange={handleMainChange}
        />
      </div>

      <h4>Адреса</h4>
      {form.addresses.map((addr, index) => (
        <div key={index} className="form-grid" style={{ position: "relative" }}>
          <input
            placeholder="Страна"
            value={addr.country}
            onChange={(e) => handleAddressChange(index, "country", e.target.value)}
          />
          <input
            placeholder="Область (регион)"
            value={addr.region}
            onChange={(e) => handleAddressChange(index, "region", e.target.value)}
          />
          <input
            placeholder="Город"
            value={addr.city}
            onChange={(e) => handleAddressChange(index, "city", e.target.value)}
          />
          <input
            placeholder="Улица"
            value={addr.street}
            onChange={(e) => handleAddressChange(index, "street", e.target.value)}
          />
          <input
            placeholder="Дом"
            value={addr.house}
            onChange={(e) => handleAddressChange(index, "house", e.target.value)}
          />
          <input
            placeholder="Квартира"
            value={addr.apartment}
            onChange={(e) => handleAddressChange(index, "apartment", e.target.value)}
          />
          <input
            placeholder="Ориентир"
            value={addr.landmark}
            onChange={(e) => handleAddressChange(index, "landmark", e.target.value)}
          />
          <input
            placeholder="ZIP код (индекс)"
            value={addr.zip}
            onChange={(e) => handleAddressChange(index, "zip", e.target.value)}
          />

          <label className="switcher">
            <input
              type="checkbox"
              checked={addr.isPrimary}
              onChange={(e) => handleAddressChange(index, "isPrimary", e.target.checked)}
            />
            Основной
          </label>

          {index > 0 && (
            <button
              type="button"
              className="delete-address"
              onClick={() => removeAddress(index)}
            >
              ❌
            </button>
          )}
        </div>
      ))}

      <button type="button" className="add-link" onClick={addAddress}>
        + Добавить новый адрес
      </button>

      <div className="action-buttons">
        <button type="button" className="cancel" onClick={resetForm}>
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

import React, { useState } from "react";
import '../AddAddressModal/AddAddressModal.css'

const COUNTRIES = [
  { code: "us", name: "США" },
  { code: "cn", name: "Китай" },
  { code: "tr", name: "Турция" },
  { code: "kr", name: "Южная Корея" },
  { code: "it", name: "Италия" }
];

type Props = {
  onAdd: (address: any) => void;
  onClose: () => void;
};

export default function AddAddressModal({ onAdd, onClose }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    street: "",
    zipCode: "",
    country: "us",
    city: "",
    phone: "",
    description: "",
    workingHours: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress = {
      id: Date.now(),
      country: form.country,
      title: `Ваш адрес в ${COUNTRIES.find(c => c.code === form.country)?.name} ${form.city}`,
      description: form.description || "Введите этот адрес как адрес доставки при совершении онлайн покупок.",
      firstName: form.firstName,
      lastName: form.lastName,
      street: form.street,
      zipCode: form.zipCode,
      countryName: COUNTRIES.find(c => c.code === form.country)?.name || "",
      city: form.city,
      phone: form.phone,
      workingHours: form.workingHours
    };
    onAdd(newAddress);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Добавить адрес</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Имя *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Фамилия *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Улица и номер дома *</label>
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Почтовый индекс *</label>
              <input
                type="text"
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Страна *</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                required
              >
                {COUNTRIES.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Город *</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Телефон *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Описание адреса</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Время приема посылок</label>
            <input
              type="text"
              name="workingHours"
              value={form.workingHours}
              onChange={handleChange}
              placeholder="Например: Lunedì-Venerdì 08:00-12:00 14:30-18:00"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel">
              Отмена
            </button>
            <button type="submit" className="submit">
              Сохранить адрес
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
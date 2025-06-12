import React, { useState } from "react";
import '../AddAddressModal/AddAddressModal.css'

const COUNTRIES = [
  { code: "us", name: "США" },
  { code: "cn", name: "Китай" },
  { code: "tr", name: "Турция" },
  { code: "kr", name: "Южная Корея" }
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
    additionalPhone: "",
    instructions: ""
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
      lines: [
        `Фамилия: ${form.lastName}`,
        `Улица: ${form.street}`,
        `Почтовый индекс: ${form.zipCode}`,
        `Страна: ${COUNTRIES.find(c => c.code === form.country)?.name}`,
        `Город: ${form.city}`,
        `Телефон: ${form.phone}`,
        ...(form.additionalPhone ? [`Телефон: ${form.additionalPhone}`] : []),
        ...(form.instructions ? [`Инструкции: ${form.instructions}`] : [])
      ].filter(Boolean)
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
            <label>Дополнительный телефон</label>
            <input
              type="tel"
              name="additionalPhone"
              value={form.additionalPhone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Инструкции для курьера</label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              rows={3}
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
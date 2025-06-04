import React, { useState } from "react";
import '../AddReceiverModal/AddReceiverModal.css'

type Props = {
  onAdd: (receiver: any) => void;
  onClose: () => void;
};

export default function AddReceiverModal({ onAdd, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ id: Date.now(), ...form });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Добавить получателя</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="ФИО" value={form.name} onChange={handleChange} required />
          <input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} required />
          <input name="country" placeholder="Страна" value={form.country} onChange={handleChange} required />
          <input name="city" placeholder="Город" value={form.city} onChange={handleChange} required />
          <input name="address" placeholder="Адрес" value={form.address} onChange={handleChange} required />
          <div className="modal-actions">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose} className="cancel">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import '../AddReceiverModal/AddReceiverModal.css'

type Props = {
  onAdd: (receiver: any) => void;
  onClose: () => void;
};

export default function AddReceiverModal({ onAdd, onClose }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    country: "",
    passportNumber: "",
    region: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
    landmark: "",
    zipCode: ""
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
        <h2>Добавление нового получателя</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-row">
              <input 
                name="fullName" 
                placeholder="Ф.И.О *" 
                value={form.fullName} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-row">
              <input 
                name="phone" 
                placeholder="Телефон *" 
                value={form.phone} 
                onChange={handleChange} 
                required 
              />
              <input 
                name="passportNumber" 
                placeholder="Серия и номер паспорта *" 
                value={form.passportNumber} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-divider"></div>

          <div className="form-section">
            <h3>Укажите адрес получателя</h3>
            
            <div className="form-row">
              <input 
                name="country" 
                placeholder="Страна *" 
                value={form.country} 
                onChange={handleChange} 
                required 
              />
              <input 
                name="region" 
                placeholder="Область (Регион) *" 
                value={form.region} 
                onChange={handleChange} 
                required 
              />
              <input 
                name="city" 
                placeholder="Город *" 
                value={form.city} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-row">
              <input 
                name="street" 
                placeholder="Улица *" 
                value={form.street} 
                onChange={handleChange} 
                required 
              />
              <input 
                name="house" 
                placeholder="Дом *" 
                value={form.house} 
                onChange={handleChange} 
                required 
              />
              <input 
                name="apartment" 
                placeholder="Квартира" 
                value={form.apartment} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-row">
              <input 
                name="landmark" 
                placeholder="Ориентир" 
                value={form.landmark} 
                onChange={handleChange} 
              />
              <input 
                name="zipCode" 
                placeholder="ZIP код (индекс)" 
                value={form.zipCode} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose} className="cancel">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}
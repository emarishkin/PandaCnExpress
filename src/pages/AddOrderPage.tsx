import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import '../style/AddOrderPage.css'
import DashboardLayout from "../layouts/DashboardLayout";

export default function AddOrderPage() {
  const [params] = useSearchParams();
  const type = params.get("type"); // auto | avia | container

  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [recipient, setRecipient] = useState("Хозяин Сергей");
  const [address, setAddress] = useState("Рысяц, Самарская обл., Самара, Малоделица, 10");
  const [comment, setComment] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [cargoType, setCargoType] = useState("");

  const calculateTotal = () => {
    let baseRate = 1;
    if (type === "auto") baseRate = 3.5;
    if (type === "avia") baseRate = 5.0;
    if (type === "container") baseRate = 2.2;

    const total = weight * baseRate;
    return total.toFixed(2);
  };

  return (
    <DashboardLayout>
      <div className="add-order-page">
        <h2>Новая заявка {type === "auto" ? "Авто" : type === "avia" ? "Авиа" : "Контейнер"}</h2>
        <p className="section-title">Заполните поля</p>

        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>Получатель *</label>
              <input 
                type="text" 
                value={recipient} 
                onChange={(e) => setRecipient(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Адрес доставки *</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Номер телефона *</label>
              <input type="tel" placeholder="+7 (___) ___-__-__" />
            </div>
          </div>

          <div className="action-links">
            <a href="#" className="action-link">Добавить нового получателя</a>
            <a href="#" className="action-link">Добавить адрес доставки</a>
          </div>
        </div>

        <div className="divider"></div>

        <p className="section-title">Данные о грузе</p>

        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>Тип груза *</label>
              <select 
                value={cargoType} 
                onChange={(e) => setCargoType(e.target.value)}
                className="select-input"
              >
                <option value="">Выберите тип груза</option>
                <option value="general">Генеральный груз</option>
                <option value="dangerous">Опасный груз</option>
                <option value="perishable">Скоропортящийся груз</option>
              </select>
            </div>
            <div className="form-group">
              <label>Комментарий</label>
              <input 
                type="text" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Примечание..."
              />
            </div>
            <div className="form-group">
              <label>Количество *</label>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(+e.target.value)} 
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Стоимость груза ($) *</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(+e.target.value)} 
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Код отслеживания *</label>
              <input 
                type="text" 
                value={trackingCode} 
                onChange={(e) => setTrackingCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Вес груза (кг) *</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(+e.target.value)} 
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="summary-section">
          <p className="info-text">
            Стоимость доставки груза приблизительная. После точного взвешивания на складе сформируется точная цена за доставку.
          </p>
          <div className="price-section">
            <span className="price-label">Цена:</span>
            <span className="price-value">{calculateTotal()} $</span>
          </div>
          <button className="save-btn">Сохранить</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import '../style/AddOrderPage.css'
import DashboardLayout from "../layouts/DashboardLayout";
import AddReceiverModal from "../components/AddReceiverModal/AddReceiverModal";
import AddAddressModal from "../components/AddAddressModal/AddAddressModal";


export default function AddOrderPage() {
  const [params] = useSearchParams();
  const type = params.get("type"); // auto | avia | container
  const [showReceiverModal, setShowReceiverModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Форма заявки
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [recipient, setRecipient] = useState("Сергей");
  const [address, setAddress] = useState("Рысяц, Самарская обл., Самара, Малоделица, 10");
  const [phone, setPhone] = useState("");
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

  const handleAddReceiver = (newReceiver: any) => {
    setRecipient(newReceiver.fullName);
    setPhone(newReceiver.phone);
    setAddress(`${newReceiver.country}, ${newReceiver.city}, ${newReceiver.street}, ${newReceiver.house}`);
    setShowReceiverModal(false);
  };

  const handleAddAddress = (newAddress: any) => {
    setAddress(`${newAddress.countryName}, ${newAddress.city}, ${newAddress.street}, ${newAddress.house}`);
    if (newAddress.phone) setPhone(newAddress.phone);
    setShowAddressModal(false);
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
                required
              />
            </div>
            <div className="form-group">
              <label>Адрес доставки *</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label>Номер телефона *</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__" 
                required
              />
            </div>
          </div>

          <div className="action-links">
            <a 
              href="#" 
              className="action-link" 
              onClick={(e) => {
                e.preventDefault();
                setShowReceiverModal(true);
              }}
            >
              Добавить нового получателя
            </a>
            <a 
              href="#" 
              className="action-link" 
              onClick={(e) => {
                e.preventDefault();
                setShowAddressModal(true);
              }}
            >
              Добавить адрес доставки
            </a>
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
                required
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
                required
              />
            </div>
            <div className="form-group">
              <label>Стоимость груза ($) *</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(+e.target.value)} 
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Код отслеживания *</label>
              <input 
                type="text" 
                value={trackingCode} 
                onChange={(e) => setTrackingCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Вес груза (кг) *</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(+e.target.value)} 
                min="0"
                required
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
          <button className="save-btn">Сохранить заявку</button>
        </div>

        {/* Модальное окно добавления получателя */}
        {showReceiverModal && (
          <AddReceiverModal 
            onAdd={handleAddReceiver}
            onClose={() => setShowReceiverModal(false)}
          />
        )}

        {/* Модальное окно добавления адреса */}
        {showAddressModal && (
          <AddAddressModal 
            onAdd={handleAddAddress}
            onClose={() => setShowAddressModal(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
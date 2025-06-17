// AddOrderPage.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../style/AddOrderPage.css'
import DashboardLayout from "../layouts/DashboardLayout";
import AddReceiverModal from "../components/AddReceiverModal/AddReceiverModal";
import AddAddressModal from "../components/AddAddressModal/AddAddressModal";

export default function AddOrderPage() {
  const [params] = useSearchParams();
  const type = params.get("type") as "auto" | "avia" | "container";
  const navigate = useNavigate();
  const [showReceiverModal, setShowReceiverModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [quantity, setQuantity] = useState<number | "">(1);
  const [weight, setWeight] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [recipient, setRecipient] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  useEffect(() => {
    if (!type) {
      navigate("/");
      return;
    }

    if (!trackingCode) {
      setTrackingCode("TRACK-" + Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    
    setDeliveryPrice(calculateTotal(weight === "" ? 0 : weight));
  }, [type, navigate, weight]);

  const calculateTotal = (currentWeight: number) => {
    if (!type) return 0;
    
    let baseRate = 1;
    if (type === "auto") baseRate = 3.5;
    if (type === "avia") baseRate = 5.0;
    if (type === "container") baseRate = 2.2;

    return currentWeight * baseRate;
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWeight(value === "" ? "" : +value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value === "" ? "" : +value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value === "" ? "" : +value);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalWeight = weight === "" ? 0 : weight;
    const finalPrice = price === "" ? 0 : price;
    const finalQuantity = quantity === "" ? 1 : quantity;

    if (!type || !recipient || !address || !phone || !finalWeight || !finalPrice || !trackingCode || !cargoType) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    const newOrder = {
      id: Date.now(),
      type,
      recipient,
      address,
      phone,
      weight: finalWeight,
      price: deliveryPrice,
      trackingCode,
      status: "Новые заявки" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      comment,
      cargoType,
      quantity: finalQuantity
    };

    const existingOrders = JSON.parse(localStorage.getItem('deliveryOrders') || '[]');
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem('deliveryOrders', JSON.stringify(updatedOrders));
    
    navigate('/dashboard');
  };

  if (!type) {
    return (
      <DashboardLayout>
        <div className="add-order-page">
          <h2>Тип доставки не выбран</h2>
          <p>Пожалуйста, выберите тип доставки из меню</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="add-order-page">
        <h2>Новая заявка {type === "auto" ? "Авто" : type === "avia" ? "Авиа" : "Контейнер"}</h2>
        <p className="section-title">Заполните поля</p>

        <form onSubmit={handleSubmit}>
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
                  onChange={handleQuantityChange} 
                  min="1"
                  placeholder="1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Стоимость груза ($) *</label>
                <input 
                  type="number" 
                  value={price} 
                  onChange={handlePriceChange} 
                  min="0"
                  placeholder="0"
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
                  onChange={handleWeightChange} 
                  min={type === "auto" ? 20 : type === "container" ? 50 : 0}
                  placeholder={type === "auto" ? "20" : type === "container" ? "50" : "0"}
                  required
                />
              </div>
              <div className="form-group">
                <label>Стоимость доставки ($)</label>
                <input 
                  type="number" 
                  value={deliveryPrice.toFixed(2)} 
                  readOnly
                  className="readonly-input"
                />
              </div>
            </div>
          </div>

          <div className="summary-section">
            <p className="info-text">
              Стоимость доставки груза приблизительная. После точного взвешивания на складе сформируется точная цена за доставку.
            </p>
            <div className="price-section">
              <span className="price-label">Цена доставки:</span>
              <span className="price-value">{deliveryPrice.toFixed(2)} $</span>
            </div>
            <button type="submit" className="save-btn">Сохранить заявку</button>
          </div>
        </form>

        {showReceiverModal && (
          <AddReceiverModal 
            onAdd={handleAddReceiver}
            onClose={() => setShowReceiverModal(false)}
          />
        )}

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
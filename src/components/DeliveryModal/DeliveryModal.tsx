// DeliveryModal.tsx
import { useState } from "react";
import "./DeliveryModal.css";

interface DeliveryModalProps {
  onClose: () => void;
  onAddOrder: (order: {
    type: "avia" | "auto" | "container";
    recipient: string;
    address: string;
    phone: string;
    weight: number;
    price: number;
    trackingCode: string;
  }) => void;
}

export default function DeliveryModal({ onClose, onAddOrder }: DeliveryModalProps) {
  const [selected, setSelected] = useState<"avia" | "auto" | "container" | null>(null);
  

  const handleConfirm = () => {
    if (!selected) return;
    
    const newOrder = {
      type: selected,
      recipient: "Новый получатель",
      address: "Адрес не указан",
      phone: "+7 (___) ___-__-__",
      weight: 0,
      price: 0,
      trackingCode: "TRACK-" + Math.random().toString(36).substring(2, 10).toUpperCase()
    };
    
    onAddOrder(newOrder);
    onClose();
  };

  const deliveryOptions = [
    { key: "avia", label: "Авиа", min: "", img: "/aviadostavka.png" },
    { key: "auto", label: "Авто", min: "Минимальный вес 20 кг", img: "/avtodostavka.png" },
    { key: "container", label: "Контейнер", min: "Минимальный вес 50 кг", img: "/konteynerdostavka.png" },
  ];

  return (
    <div className="modal-backdrop">
      <div className="delivery-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h3>Выберите тип доставки</h3>
        <div className="delivery-options">
          {deliveryOptions.map((opt) => (
            <div
              key={opt.key}
              className={`option ${selected === opt.key ? "selected" : ""}`}
              onClick={() => setSelected(opt.key as any)}
            >
              <img src={opt.img} alt={opt.label} />
              <div>{opt.label}</div>
              {opt.min && <small>{opt.min}</small>}
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Отменить
          </button>
          <button 
            className="confirm-btn" 
            onClick={handleConfirm} 
            disabled={!selected}
          >
            Выбрать
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeliveryModal.css";

interface DeliveryModalProps {
  onClose: () => void;
  onAddPackage?: () => void; // Добавляем опциональный пропс
}

type DeliveryType = "avia" | "auto" | "container";

export default function DeliveryModal({ onClose, onAddPackage }: DeliveryModalProps) {
  const [selected, setSelected] = useState<DeliveryType | null>(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!selected) return;
    
    // Вызываем onAddPackage если он передан
    if (onAddPackage) {
      onAddPackage();
    }
    
    onClose();
    navigate(`/add?type=${selected}`);
  };

  const deliveryOptions = [
    { 
      key: "avia" as const, 
      label: "Авиа", 
      min: "", 
      img: "/aviadostavka.png" 
    },
    { 
      key: "auto" as const, 
      label: "Авто", 
      min: "Минимальный вес 20 кг", 
      img: "/avtodostavka.png" 
    },
    { 
      key: "container" as const, 
      label: "Контейнер", 
      min: "Минимальный вес 50 кг", 
      img: "/konteynerdostavka.png" 
    },
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
              onClick={() => setSelected(opt.key)}
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
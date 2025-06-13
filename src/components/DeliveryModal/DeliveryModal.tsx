import { useState } from "react";
import '../DeliveryModal/DeliveryModal.css'

export default function DeliveryModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<"avia" | "auto" | "container" | null>(null);

  return (
    <div className="modal-backdrop">
      <div className="delivery-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h3>Выберите тип доставки</h3>
        <div className="delivery-options">
          {[
            { key: "avia", label: "Авиа", min: "", img: "/aviadostavka.png" },
            { key: "auto", label: "Авто", min: "Минимальный вес 20 кг", img: "/avtodostavka.png" },
            { key: "container", label: "Контейнер", min: "Минимальный вес 50 кг", img: "/konteynerdostavka.png" },
          ].map((opt) => (
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
          <button onClick={onClose} className="cancel-btn">Отменить</button>
          <button className="confirm-btn">Выбрать</button>
        </div>
      </div>
    </div>
  );
}

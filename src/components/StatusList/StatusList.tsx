import { useState } from "react";
import "./StatusList.css";
import DeliveryModal from "../DeliveryModal/DeliveryModal";

export default function StatusList() {
  const [showModal, setShowModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState("Новые заявки");

  const statuses = [
    "Новые заявки",
    "На складе",
    "Готовится к отправке",
    "В пути",
    "Готов к выдаче",
    "Доставлено"
  ];

  return (
    <div className="status-section">
      <div className="status-header">
        <button className="add-package-btn" onClick={() => setShowModal(true)}>
          + Добавить посылку
        </button>
      </div>

      <div className="status-list">
        {statuses.map((status) => (
          <div 
            key={status}
            className={`status-item ${activeStatus === status ? 'active' : ''}`}
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </div>
        ))}
      </div>

      {showModal && <DeliveryModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
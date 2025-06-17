import { useState } from "react";
import "./StatusList.css";
import DeliveryModal from "../DeliveryModal/DeliveryModal";

// Определяем тип для статусов
type Status = 
  | "Новые заявки"
  | "На складе"
  | "Готовится к отправке"
  | "В пути"
  | "Готов к выдаче"
  | "Доставлено";

// Тип для объекта счетчиков
type StatusCounts = {
  [key in Status]: number;
};

export default function StatusList() {
  const [showModal, setShowModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState<Status>("Новые заявки");
  const [counts, setCounts] = useState<StatusCounts>({
    "Новые заявки": 0,
    "На складе": 0,
    "Готовится к отправке": 0,
    "В пути": 0,
    "Готов к выдаче": 0,
    "Доставлено": 0
  });

  const statuses: Status[] = [
    "Новые заявки",
    "На складе",
    "Готовится к отправке",
    "В пути",
    "Готов к выдаче",
    "Доставлено"
  ];

  const handleAddPackage = () => {
    setCounts(prev => ({
      ...prev,
      "Новые заявки": prev["Новые заявки"] + 1
    }));
    setShowModal(false);
  };

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
            <div className="status-content">
              <span className="status-text">{status}</span>
              <span className="status-count">{counts[status]}</span>
              <span className="status-icon">→</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <DeliveryModal 
          onClose={() => setShowModal(false)} 
          onAddPackage={handleAddPackage}
        />
      )}
    </div>
  );
}
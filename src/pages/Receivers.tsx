import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AddReceiverModal from "../components/AddReceiverModal/AddReceiverModal";
import '../style/Receivers.css';
import {  FaPhone, FaMapMarkerAlt, FaGlobe, FaPlus } from "react-icons/fa";

export default function Receivers() {
  const [receivers, setReceivers] = useState([
    {
      id: 1,
      name: "Иванов Иван",
      phone: "+7 999 123 4567",
      country: "Россия",
      city: "Москва",
      address: "ул. Ленина, д. 5, кв. 12",
    },
    {
      id: 2,
      name: "Сидоров Алексей",
      phone: "+7 903 777 1111",
      country: "Казахстан",
      city: "Алматы",
      address: "пр. Абая, 45",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (id: number) => {
    setReceivers(receivers.filter(r => r.id !== id));
  };

  return (
    <>
      {modalOpen && (
        <AddReceiverModal
          onAdd={(newR) => setReceivers([...receivers, { ...newR, id: Date.now() }])}
          onClose={() => setModalOpen(false)}
        />
      )}

      <DashboardLayout>
        <div className="receivers-container">
          <div className="receivers-header">
            <h2>Получатели</h2>
            <button className="add-button" onClick={() => setModalOpen(true)}>
              <FaPlus /> Добавить получателя
            </button>
          </div>

          <div className="receiver-list">
            {receivers.length > 0 ? (
              receivers.map((r) => (
                <div key={r.id} className="receiver-card">
                  <div className="card-header">
                    <h3>{r.name}</h3>
                  </div>
                  <div className="card-body">
                    <div className="detail-row">
                      <FaPhone className="detail-icon" />
                      <span className="detail-label">Телефон:</span>
                      <span className="detail-value">{r.phone}</span>
                    </div>
                    <div className="detail-row">
                      <FaGlobe className="detail-icon" />
                      <span className="detail-label">Страна:</span>
                      <span className="detail-value">{r.country}</span>
                    </div>
                    <div className="detail-row">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span className="detail-label">Город:</span>
                      <span className="detail-value">{r.city}</span>
                    </div>
                    <div className="detail-row">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span className="detail-label">Адрес:</span>
                      <span className="detail-value">{r.address}</span>
                    </div>
                  </div>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(r.id)}
                  >
                    Удалить
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <h3>Нет добавленных получателей</h3>
                <button 
                  className="add-button" 
                  onClick={() => setModalOpen(true)}
                >
                  <FaPlus /> Добавить получателя
                </button>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AddReceiverModal from "../components/AddReceiverModal/AddReceiverModal";
import '../style/Receivers.css';
import { FaUser, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

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
        <div className="receivers-header">
          <h2>Получатели</h2>
          <button className="add-button" onClick={() => setModalOpen(true)}>
            <FaUser /> Добавить получателя
          </button>
        </div>

        <div className="receiver-list">
          {receivers.map((r) => (
            <div key={r.id} className="receiver-card">
              <h3>{r.name}</h3>
              <ul>
                <li>
                  <FaPhone style={{ marginRight: 10, color: "#d4002a" }} />
                  <strong>Телефон:</strong> {r.phone}
                </li>
                <li>
                  <FaGlobe style={{ marginRight: 10, color: "#d4002a" }} />
                  <strong>Страна:</strong> {r.country}
                </li>
                <li>
                  <FaMapMarkerAlt style={{ marginRight: 10, color: "#d4002a" }} />
                  <strong>Город:</strong> {r.city}
                </li>
                <li>
                  <FaMapMarkerAlt style={{ marginRight: 10, color: "#d4002a" }} />
                  <strong>Адрес:</strong> {r.address}
                </li>
              </ul>
              <button 
                className="delete-button" 
                onClick={() => handleDelete(r.id)}
              >
                Удалить получателя
              </button>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
}
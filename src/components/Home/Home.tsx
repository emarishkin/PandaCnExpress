import { useState } from "react";

import '../Home/Home.css'
import DashboardLayout from "../../layouts/DashboardLayout";
import DeliveryModal from "../DeliveryModal/DeliveryModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="home-header">
        <h2>Главная</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Добавить посылку
        </button>
      </div>
      {showModal && <DeliveryModal onClose={() => setShowModal(false)} />}
    </DashboardLayout>
  );
}

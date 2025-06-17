// StatusList.tsx
import { useState, useEffect } from "react";
import "./StatusList.css";
import OrderCard from "../OrderCard/OrderCard";
import { useNavigate } from "react-router-dom";
import DeliveryModal from "../DeliveryModal/DeliveryModal";

type Status = 
  | "Новые заявки"
  | "На складе"
  | "Готовится к отправке"
  | "В пути"
  | "Готов к выдаче"
  | "Доставлено";

type Order = {
  id: number;
  type: "avia" | "auto" | "container";
  recipient: string;
  address: string;
  phone: string;
  weight: number;
  price: number;
  trackingCode: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  comment?: string;
  cargoType?: string;
  quantity?: number;
};

export default function StatusList() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<Status>("Новые заявки");
  const [orders, setOrders] = useState<Order[]>([]);
  const [showModal, setShowModal] = useState(false);

  const statuses: Status[] = [
    "Новые заявки",
    "На складе",
    "Готовится к отправке",
    "В пути",
    "Готов к выдаче",
    "Доставлено"
  ];

  useEffect(() => {
    const savedOrders = localStorage.getItem('deliveryOrders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        const ordersWithDates = parsedOrders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt)
        }));
        setOrders(ordersWithDates);
      } catch (e) {
        console.error("Failed to parse orders from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    const checkStatusUpdates = () => {
      setOrders(prevOrders => {
        const updatedOrders = prevOrders.map(order => {
          const daysInStatus = Math.floor(
            (new Date().getTime() - new Date(order.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (daysInStatus >= 2) {
            const currentIndex = statuses.indexOf(order.status);
            if (currentIndex < statuses.length - 1) {
              return {
                ...order,
                status: statuses[currentIndex + 1],
                updatedAt: new Date()
              };
            }
          }
          return order;
        });
        
        if (JSON.stringify(updatedOrders) !== JSON.stringify(prevOrders)) {
          localStorage.setItem('deliveryOrders', JSON.stringify(updatedOrders));
          return updatedOrders;
        }
        return prevOrders;
      });
    };

    // Проверяем сразу при загрузке
    checkStatusUpdates();

    // Затем каждые 24 часа
    const interval = setInterval(checkStatusUpdates, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddOrder = (order: Partial<Order>) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      status: "Новые заявки" as Status,
      createdAt: new Date(),
      updatedAt: new Date(),
      comment: order.comment || "",
      cargoType: order.cargoType || "general",
      quantity: order.quantity || 1
    } as Order;

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('deliveryOrders', JSON.stringify(updatedOrders));
    navigate(`/add?type=${order.type}`);
  };

  const counts = statuses.reduce((acc, status) => {
    acc[status] = orders.filter(o => o.status === status).length;
    return acc;
  }, {} as Record<Status, number>);

  return (
    <div className="status-section">
      <div className="status-header">
        <button 
          className="add-package-btn" 
          onClick={() => setShowModal(true)}
        >
          + Добавить посылку
        </button>
      </div>

      {showModal && (
        <DeliveryModal 
          onClose={() => setShowModal(false)}
          onAddOrder={handleAddOrder}
        />
      )}

      <div className="status-container">
        <div className="status-list">
  {statuses.map((status) => (
    <div 
      key={status}
      className={`status-item ${activeStatus === status ? 'active' : ''}`}
      onClick={() => setActiveStatus(status)}
      data-status={status}
    >
      <div className="status-content">
        <span className="status-icon"></span>
        <div className="status-text-wrapper">
          <span className="status-text">{status}</span>
          <span className="status-count">{counts[status]} заказов</span>
        </div>
        <span className="status-icon">→</span>
      </div>
    </div>
  ))}
</div>

        <div className="orders-list">
          {orders
            .filter(order => order.status === activeStatus)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
        </div>
      </div>
    </div>
  );
}
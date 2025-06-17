// OrderCard.tsx
import '../OrderCard/OrderCard.css';

type Order = {
  id: number;
  type: "avia" | "auto" | "container";
  recipient: string;
  address: string;
  phone: string;
  weight: number;
  price: number;
  trackingCode: string;
  status: string;
  createdAt: Date;
  comment?: string;
  cargoType?: string;
  quantity?: number;
};

const getCargoTypeLabel = (type?: string) => {
  switch (type) {
    case "general": return "Генеральный";
    case "dangerous": return "Опасный";
    case "perishable": return "Скоропортящийся";
    default: return "Не указан";
  }
};

export default function OrderCard({ order }: { order: Order }) {
  const getTypeLabel = () => {
    switch (order.type) {
      case "avia": return "Авиа";
      case "auto": return "Авто";
      case "container": return "Контейнер";
      default: return "";
    }
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <span className="order-id">#{order.id}</span>
        <span className={`order-type ${order.type}`}>{getTypeLabel()}</span>
      </div>
      
      <div className="order-body">
        <div className="order-row">
          <span className="order-label">Получатель:</span>
          <span className="order-value">{order.recipient}</span>
        </div>
        
        <div className="order-row">
          <span className="order-label">Телефон:</span>
          <span className="order-value">{order.phone}</span>
        </div>
        
        <div className="order-row">
          <span className="order-label">Адрес:</span>
          <span className="order-value">{order.address}</span>
        </div>
        
        <div className="order-row">
          <span className="order-label">Тип груза:</span>
          <span className="order-value">{getCargoTypeLabel(order.cargoType)}</span>
        </div>
        
        <div className="order-row">
          <span className="order-label">Количество:</span>
          <span className="order-value">{order.quantity || 1}</span>
        </div>
        
        <div className="order-row">
          <span className="order-label">Вес:</span>
          <span className="order-value">{order.weight} кг</span>
        </div>
        
        <div className="order-row">
          <span className="order-label">Стоимость:</span>
          <span className="order-value">{order.price} $</span>
        </div>
        
        <div className="order-row">
          <span className="order-label">Комментарий:</span>
          <span className="order-value">{order.comment || "нет"}</span>
        </div>
        
        <div className="order-row">
          <span className="order-label">Трек-код:</span>
          <span className="order-value tracking-code">{order.trackingCode}</span>
        </div>
      </div>
      
      <div className="order-footer">
        <span className="order-date">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
        <span className={`order-status ${order.status.replace(/\s+/g, '-')}`}>
          {order.status}
        </span>
      </div>
    </div>
  );
}
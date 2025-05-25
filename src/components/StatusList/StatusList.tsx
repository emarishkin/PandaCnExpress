import type { FC } from 'react';
import '../StatusList/StatusList.css'

const statuses = [
  { label: "Новые заявки", count: 0, color: "#e3f2fd" },
  { label: "На складе", count: 0, color: "#fff3e0" },
  { label: "В пути", count: 0, color: "#ede7f6" },
  { label: "Готовится к отправке", count: 0, color: "#e8f5e9" },
  { label: "Готов к выдаче", count: 0, color: "#f3e5f5" },
  { label: "Доставлена", count: 0, color: "#fce4ec" },
];

export const StatusList:FC = () => {
  return (
    <div className="status-list">
      {statuses.map((status, index) => (
        <div
          key={index}
          className="status-card"
          style={{ backgroundColor: status.color }}
        >
          <div className="status-count">{status.count}</div>
          <div className="status-label">{status.label}</div>
        </div>
      ))}
    </div>
  );
}

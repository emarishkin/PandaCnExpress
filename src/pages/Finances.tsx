import DashboardLayout from "../layouts/DashboardLayout";
import '../style/Finances.css'

const mockData = [
  {
    id: 1,
    date: "2025-06-01",
    client: "Усачев Сергей",
    account: "BY45UNBS3012",
    amount: "1200",
    currency: "USD",
    method: "Карта",
    comment: "Пополнение баланса",
  },
  {
    id: 2,
    date: "2025-06-03",
    client: "Усачев Сергей",
    account: "BY45UNBS3012",
    amount: "750",
    currency: "EUR",
    method: "Банк",
    comment: "Перевод",
  },
];

export default function Finances() {
  return (
    <DashboardLayout>
      <h2 className="finances-title">Финансовые операции</h2>

      <div className="finance-table-wrapper">
        <table className="finance-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Дата создания</th>
              <th>Клиент</th>
              <th>Банковский счёт</th>
              <th>Сумма</th>
              <th>Валюта</th>
              <th>Тип оплаты</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.date}</td>
                <td>{entry.client}</td>
                <td>{entry.account}</td>
                <td>{entry.amount}</td>
                <td>{entry.currency}</td>
                <td>{entry.method}</td>
                <td>{entry.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

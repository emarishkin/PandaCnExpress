import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import '../style/AddOrderPage.css'
import DashboardLayout from "../layouts/DashboardLayout";

export default function AddOrderPage() {
  const [params] = useSearchParams();
  const type = params.get("type"); // auto | avia | container

  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);

  const calculateTotal = () => {
    let baseRate = 1;
    if (type === "auto") baseRate = 3.5;
    if (type === "avia") baseRate = 5.0;
    if (type === "container") baseRate = 2.2;

    const total = weight * baseRate;
    return total.toFixed(2);
  };

  return (
    <DashboardLayout>
    <div className="add-order-page">
      <h2>Новая заявка {type === "auto" ? "Авто" : type === "avia" ? "Авиа" : "Контейнер"}</h2>

      <div className="form-grid">
        <div>
          <label>Количество *</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(+e.target.value)} />
        </div>
        <div>
          <label>Вес груза (кг) *</label>
          <input type="number" value={weight} onChange={(e) => setWeight(+e.target.value)} />
        </div>
        <div>
          <label>Стоимость груза ($) *</label>
          <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />
        </div>
        <div>
          <label>Комментарий *</label>
          <input type="text" placeholder="Примечание..." />
        </div>
        <div>
          <label>Код отслеживания *</label>
          <input type="text" />
        </div>
      </div>

      <div className="summary-box">
        <p>💡 Стоимость доставки приблизительная. Итоговая сумма уточняется на складе.</p>
        <p>
          <strong>Цена: {calculateTotal()} $</strong>
        </p>
        <button className="save-btn">Сохранить</button>
      </div>
    </div>
    </DashboardLayout>
  );
}

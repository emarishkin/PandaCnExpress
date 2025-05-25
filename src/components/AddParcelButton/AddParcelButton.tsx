import  { type FC } from "react";
import '../AddParcelButton/AddParcelButton.css'

export const AddParcelButton:FC = () => {
  const handleClick = () => {
    alert("Добавить посылку (пока не подключено)");
  };

  return (
    <button className="add-parcel-button" onClick={handleClick}>
      ➕ Добавить посылку
    </button>
  );
}

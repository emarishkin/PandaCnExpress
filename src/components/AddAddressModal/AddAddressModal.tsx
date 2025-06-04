import React, { useState } from "react";
import '../AddAddressModal/AddAddressModal.css'

type Props = {
  onAdd: (address: any) => void;
  onClose: () => void;
};

export default function AddAddressModal({ onAdd, onClose }: Props) {
  const [form, setForm] = useState({
    country: "",
    title: "",
    lines: [""],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === "line") {
      const newLines = [...form.lines];
      if (typeof index === "number") newLines[index] = value;
      setForm({ ...form, lines: newLines });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addLine = () => {
    setForm({ ...form, lines: [...form.lines, ""] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.country || !form.title) return;
    onAdd({
      id: Date.now(),
      country: form.country.toLowerCase(),
      title: form.title,
      lines: form.lines.filter(line => line.trim() !== ""),
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Добавить адрес</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="country"
            placeholder="Страна (напр. cn, us)"
            value={form.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Заголовок адреса"
            value={form.title}
            onChange={handleChange}
            required
          />

          {form.lines.map((line, i) => (
            <input
              key={i}
              type="text"
              name="line"
              placeholder={`Строка ${i + 1}`}
              value={line}
              onChange={(e) => handleChange(e, i)}
            />
          ))}
          <button type="button" onClick={addLine}>
            + Добавить строку
          </button>

          <div className="modal-actions">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose} className="cancel">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}

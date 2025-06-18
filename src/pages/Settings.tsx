import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import '../style/Settings.css';

export default function Settings() {
  const [tab, setTab] = useState<"info" | "password">("info");

  return (
    <DashboardLayout>
      <div className="settings">
        <div className="settings-tabs">
          <button
            className={tab === "info" ? "active" : ""}
            onClick={() => setTab("info")}
          >
            Личные данные
          </button>
          <button
            className={tab === "password" ? "active" : ""}
            onClick={() => setTab("password")}
          >
            Смена пароля
          </button>
        </div>

        {tab === "info" ? <UserInfoForm /> : <PasswordForm />}
      </div>
    </DashboardLayout>
  );
}

function UserInfoForm() {
  type Address = {
    country: string;
    region: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    zip: string;
    landmark: string;
    isPrimary: boolean;
  };

  type FormState = {
    name: string;
    phone: string;
    passport: string;
    email: string;
    addresses: Address[];
  };

  type FormErrors = {
    name?: string;
    phone?: string;
    passport?: string;
    email?: string;
    addresses?: Array<Partial<Record<keyof Address, string>>>;
  };

  const initialState: FormState = {
    name: "",
    phone: "",
    passport: "",
    email: "",
    addresses: [
      {
        country: "",
        region: "",
        city: "",
        street: "",
        house: "",
        apartment: "",
        zip: "",
        landmark: "",
        isPrimary: true,
      },
    ],
  };

  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('userInfo');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setForm(parsedData);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Обязательное поле";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Обязательное поле";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Некорректный email";
      isValid = false;
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Обязательное поле";
      isValid = false;
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone)) {
      newErrors.phone = "Некорректный номер";
      isValid = false;
    }

    const addressErrors: Array<Partial<Record<keyof Address, string>>> = [];
    form.addresses.forEach((addr, index) => {
      const addrErrors: Partial<Record<keyof Address, string>> = {};
      
      if (!addr.country.trim()) addrErrors.country = "Обязательное поле";
      if (!addr.city.trim()) addrErrors.city = "Обязательное поле";
      if (!addr.street.trim()) addrErrors.street = "Обязательное поле";
      if (!addr.house.trim()) addrErrors.house = "Обязательное поле";

      if (Object.keys(addrErrors).length > 0) {
        addressErrors[index] = addrErrors;
        isValid = false;
      }
    });

    if (addressErrors.length > 0) {
      newErrors.addresses = addressErrors;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleAddressChange = (index: number, field: keyof Address, value: string | boolean) => {
    const updated = [...form.addresses];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, addresses: updated });

    if (errors.addresses?.[index]?.[field]) {
      const newAddressErrors = [...(errors.addresses || [])];
      newAddressErrors[index] = { ...newAddressErrors[index], [field]: undefined };
      setErrors({ ...errors, addresses: newAddressErrors });
    }

    if (field === 'isPrimary' && value === true) {
      updated.forEach((addr, i) => {
        if (i !== index) addr.isPrimary = false;
      });
      setForm({ ...form, addresses: updated });
    }
  };

  const addAddress = () => {
    setForm({
      ...form,
      addresses: [
        ...form.addresses,
        {
          country: "",
          region: "",
          city: "",
          street: "",
          house: "",
          apartment: "",
          zip: "",
          landmark: "",
          isPrimary: false,
        },
      ],
    });
  };

  const removeAddress = (index: number) => {
    const updated = [...form.addresses];
    const wasPrimary = updated[index].isPrimary;
    updated.splice(index, 1);
    
    if (wasPrimary && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    
    setForm({ ...form, addresses: updated });
  };

  const resetForm = () => {
    if (window.confirm("Вы уверены, что хотите сбросить все изменения?")) {
      setForm(initialState);
      setErrors({});
    }
  };

  const saveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userInfo', JSON.stringify(form));
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      console.log("Сохранённые данные:", form);
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Произошла ошибка при сохранении");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={saveForm}>
      <h3>Ваши данные</h3>
      {isSuccess && (
        <div className="success-message">
          Данные успешно сохранены!
        </div>
      )}
      <div className="form-grid">
        <div className="form-field">
          <input
            name="name"
            placeholder="Ф.И.О*"
            value={form.name}
            onChange={handleMainChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-field">
          <input
            name="phone"
            placeholder="Телефон*"
            value={form.phone}
            onChange={handleMainChange}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
        <div className="form-field">
          <input
            name="passport"
            placeholder="Серия и номер паспорта"
            value={form.passport}
            onChange={handleMainChange}
          />
        </div>
        <div className="form-field">
          <input
            name="email"
            placeholder="Электронная почта*"
            value={form.email}
            onChange={handleMainChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
      </div>

      <h4>Адреса</h4>
      {form.addresses.map((addr, index) => (
        <div key={index} className="address-block">
          <div className="form-grid">
            <div className="form-field">
              <input
                placeholder="Страна*"
                value={addr.country}
                onChange={(e) => handleAddressChange(index, "country", e.target.value)}
                className={errors.addresses?.[index]?.country ? 'error' : ''}
              />
              {errors.addresses?.[index]?.country && (
                <span className="error-message">{errors.addresses[index]?.country}</span>
              )}
            </div>
            <div className="form-field">
              <input
                placeholder="Область (регион)"
                value={addr.region}
                onChange={(e) => handleAddressChange(index, "region", e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                placeholder="Город*"
                value={addr.city}
                onChange={(e) => handleAddressChange(index, "city", e.target.value)}
                className={errors.addresses?.[index]?.city ? 'error' : ''}
              />
              {errors.addresses?.[index]?.city && (
                <span className="error-message">{errors.addresses[index]?.city}</span>
              )}
            </div>
            <div className="form-field">
              <input
                placeholder="Улица*"
                value={addr.street}
                onChange={(e) => handleAddressChange(index, "street", e.target.value)}
                className={errors.addresses?.[index]?.street ? 'error' : ''}
              />
              {errors.addresses?.[index]?.street && (
                <span className="error-message">{errors.addresses[index]?.street}</span>
              )}
            </div>
            <div className="form-field">
              <input
                placeholder="Дом*"
                value={addr.house}
                onChange={(e) => handleAddressChange(index, "house", e.target.value)}
                className={errors.addresses?.[index]?.house ? 'error' : ''}
              />
              {errors.addresses?.[index]?.house && (
                <span className="error-message">{errors.addresses[index]?.house}</span>
              )}
            </div>
            <div className="form-field">
              <input
                placeholder="Квартира"
                value={addr.apartment}
                onChange={(e) => handleAddressChange(index, "apartment", e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                placeholder="Ориентир"
                value={addr.landmark}
                onChange={(e) => handleAddressChange(index, "landmark", e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                placeholder="ZIP код (индекс)"
                value={addr.zip}
                onChange={(e) => handleAddressChange(index, "zip", e.target.value)}
              />
            </div>

            <label className="switcher">
              <input
                type="checkbox"
                checked={addr.isPrimary}
                onChange={(e) => handleAddressChange(index, "isPrimary", e.target.checked)}
              />
              Основной
            </label>

            {index > 0 && (
              <button
                type="button"
                className="delete-address"
                onClick={() => removeAddress(index)}
                title="Удалить адрес"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="#d4002a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}

      <button type="button" className="add-link" onClick={addAddress}>
        + Добавить новый адрес
      </button>

      <div className="action-buttons">
        <button 
          type="button" 
          className="cancel" 
          onClick={resetForm}
          disabled={isSubmitting}
        >
          Сбросить
        </button>
        <button 
          type="submit" 
          className="save" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span> Сохранение...
            </>
          ) : (
            "Сохранить"
          )}
        </button>
      </div>
    </form>
  );
}

function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      current: "",
      new: "",
      confirm: ""
    };
    let isValid = true;

    if (!currentPassword) {
      newErrors.current = "Введите текущий пароль";
      isValid = false;
    }

    if (!newPassword) {
      newErrors.new = "Введите новый пароль";
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.new = "Пароль должен содержать минимум 8 символов";
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirm = "Пароли не совпадают";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Ошибка смены пароля:", error);
      setErrors({
        ...errors,
        current: "Ошибка при смене пароля. Проверьте текущий пароль."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (window.confirm("Вы уверены, что хотите сбросить все изменения?")) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({
        current: "",
        new: "",
        confirm: ""
      });
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h3>Смена пароля</h3>
      {isSuccess && (
        <div className="success-message">
          Пароль успешно изменён!
        </div>
      )}
      <div className="form-grid">
        <div className="form-field">
          <input 
            placeholder="Текущий пароль*" 
            type="password" 
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              if (errors.current) setErrors({...errors, current: ""});
            }}
            className={errors.current ? 'error' : ''}
          />
          {errors.current && <span className="error-message">{errors.current}</span>}
        </div>
        <div className="form-field">
          <input 
            placeholder="Новый пароль*" 
            type="password" 
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (errors.new) setErrors({...errors, new: ""});
            }}
            className={errors.new ? 'error' : ''}
          />
          {errors.new && <span className="error-message">{errors.new}</span>}
        </div>
        <div className="form-field">
          <input 
            placeholder="Повторите пароль*" 
            type="password" 
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirm) setErrors({...errors, confirm: ""});
            }}
            className={errors.confirm ? 'error' : ''}
          />
          {errors.confirm && <span className="error-message">{errors.confirm}</span>}
        </div>
      </div>
      <div className="password-hints">
        <p>Пароль должен содержать:</p>
        <ul>
          <li className={newPassword.length >= 8 ? 'valid' : ''}>Минимум 8 символов</li>
          <li className={/[A-Z]/.test(newPassword) ? 'valid' : ''}>Хотя бы одну заглавную букву</li>
          <li className={/\d/.test(newPassword) ? 'valid' : ''}>Хотя бы одну цифру</li>
        </ul>
      </div>
      <div className="action-buttons">
        <button 
          type="button" 
          className="cancel" 
          onClick={resetForm}
          disabled={isSubmitting}
        >
          Сбросить
        </button>
        <button 
          type="submit" 
          className="save" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span> Сохранение...
            </>
          ) : (
            "Изменить пароль"
          )}
        </button>
      </div>
    </form>
  );
}
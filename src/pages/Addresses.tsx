import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import CountryStatusList from "../components/CountryStatusList/CountryStatusList";
import AddAddressModal from "../components/AddAddressModal/AddAddressModal";
import '../style/Addresses.css'

export default function Addresses() {
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [addressList, setAddressList] = useState(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = addressList.filter((a) => a.country === selectedCountry);
  const countryName = initialCountries.find(c => c.code === selectedCountry)?.name || "";

  return (
    <>
      {modalOpen && (
        <AddAddressModal
          onAdd={(newAddr) => setAddressList([...addressList, newAddr])}
          onClose={() => setModalOpen(false)}
        />
      )}

      <DashboardLayout
        statusList={
          <div className="country-sidebar">
            <CountryStatusList
              countries={initialCountries.map((c) => ({
                ...c,
                count: addressList.filter((a) => a.country === c.code).length,
              }))}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />
            <button 
              onClick={() => setModalOpen(true)} 
              className="add-address-button mobile-only"
            >
              + Добавить адрес
            </button>
          </div>
        }
      >
        <div className="addresses-content">
          <div className="addresses-header">
            <h1>{countryName}</h1>
            <button 
              onClick={() => setModalOpen(true)} 
              className="add-address-button desktop-only"
            >
              + Добавить адрес
            </button>
          </div>

          <div className="address-cards">
            {filtered.map((addr) => (
              <div key={addr.id} className="address-card">
                <h2>{addr.title}</h2>
                <p className="address-description">
                  Введите этот адрес в качестве адреса доставки при совершении 
                  онлайн-покупок в магазинах {countryName}
                </p>
                <div className="address-details">
                  {addr.lines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                <p className="working-hours">
                  Приём посылок на складе с 10:00 до 18:00
                </p>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

// Данные остаются теми же
const initialCountries = [
  { name: "Китай", code: "cn", count: 1 },
  { name: "США", code: "us", count: 2 },
  { name: "Турция", code: "tr", count: 0 },
];

const initialAddresses = [
  {
    id: 1,
    country: "us",
    title: "Ваш адрес в United States New York",
    lines: [
      "Фамилия: Б-4437, Усачев Сергей",
      "Улица: Эммонс-авеню, 3047, Бруклин",
      "Почтовый индекс: 11235",
      "Страна: Соединенные Штаты",
      "Город: Нью-Йорк",
      "Телефон: +19176057707",
      "Телефон: +19176057117"
    ],
  },
  {
    id: 2,
    country: "us",
    title: "Ваш адрес в United States Delaware",
    lines: [
      "Фамилия: Б-4437, Усачев Сергей",
      "Улица: Корсон-драйв, 705, Делавэр",
      "Почтовый индекс: 19701",
      "Страна: Соединенные Штаты",
      "Город: Медведь",
      "Телефон: +19176057707"
    ],
  }
];
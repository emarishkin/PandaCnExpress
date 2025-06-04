import  { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import CountryStatusList from "../components/CountryStatusList/CountryStatusList";
import AddAddressModal from "../components/AddAddressModal/AddAddressModal";
import '../style/Addresses.css'

const initialCountries = [
  { name: "Китай", code: "cn", count: 1 },
  { name: "США", code: "us", count: 2 },
  { name: "Турция", code: "tr", count: 0 },
];

const initialAddresses = [
  {
    id: 1,
    country: "cn",
    title: "Ваш адрес в China (Guangzhou)",
    lines: [
      "Фамилия: Б-4437, Усачев Сергей",
      "Улица: Baiyun road 3",
      "Индекс: 510000",
      "Город: Guangzhou",
      "Телефон: +86 188 8888 8888",
    ],
  },
  {
    id: 2,
    country: "us",
    title: "Ваш адрес в США (Нью-Йорк)",
    lines: [
      "Фамилия: Б-4437, Усачев Сергей",
      "Улица: Эммонс-авеню, 3047, Бруклин",
      "Индекс: 11235",
      "Город: Нью-Йорк",
      "Телефон: +1 917 605 7707",
      "Телефон: +1 917 605 7117",
    ],
  },
  {
    id: 3,
    country: "us",
    title: "Альтернативный адрес (Нью-Джерси)",
    lines: [
      "Фамилия: Б-4437, Усачев Сергей",
      "Улица: JFK Blvd E, 1234",
      "Индекс: 07093",
      "Город: Нью-Джерси",
      "Телефон: +1 917 123 4567",
    ],
  },
];

export default function Addresses() {
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [addressList, setAddressList] = useState(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = addressList.filter((a) => a.country === selectedCountry);

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
          <div className="dashboard-status">
            <CountryStatusList
              countries={initialCountries.map((c) => ({
                ...c,
                count: addressList.filter((a) => a.country === c.code).length,
              }))}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />

            {/* Мобильные карточки */}
            <div className="mobile-address-list">
              {filtered.map((addr) => (
                <div key={addr.id} className="address-card">
                  <h3>{addr.title}</h3>
                  <ul>
                    {addr.lines.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        }
      >
        {/* Кнопка добавления */}
        <button onClick={() => setModalOpen(true)} className="add-address-button">
          + Добавить адрес
        </button>

        {/* Десктопный список */}
        <div className="desktop-address-list">
          <h2 className="addresses-title">
            Адреса: {selectedCountry.toUpperCase()}
          </h2>
          <div className="address-list">
            {filtered.map((addr) => (
              <div key={addr.id} className="address-card">
                <h3>{addr.title}</h3>
                <ul>
                  {addr.lines.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
            {filtered.length === 0 && <p>Нет адресов для этой страны.</p>}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

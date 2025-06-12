import { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import DashboardLayout from "../layouts/DashboardLayout";
import CountryStatusList from "../components/CountryStatusList/CountryStatusList";
import AddAddressModal from "../components/AddAddressModal/AddAddressModal";
import '../style/Addresses.css'

const COUNTRIES = [
  { name: "Китай", code: "cn" },
  { name: "США", code: "us" },
  { name: "Турция", code: "tr" },
  { name: "Южная Корея", code: "kr" }
];

export default function Addresses() {
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [addressList, setAddressList] = useState(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = addressList.filter((a) => a.country === selectedCountry);
  const countryName = COUNTRIES.find(c => c.code === selectedCountry)?.name || "";

  const handleAddAddress = (newAddr: any) => {
    setAddressList([...addressList, newAddr]);
  };

  const handleDeleteAddress = (id: number) => {
    setAddressList(addressList.filter(addr => addr.id !== id));
  };

  return (
    <>
      {modalOpen && (
        <AddAddressModal
          onAdd={handleAddAddress}
          onClose={() => setModalOpen(false)}
        />
      )}

      <DashboardLayout
        statusList={
          <div className="country-sidebar">
            <CountryStatusList
              countries={COUNTRIES.map((c) => ({
                ...c,
                count: addressList.filter((a) => a.country === c.code).length,
              }))}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />
          </div>
        }
      >
        <div className="addresses-content">
          <div className="addresses-header">
            {/* <h1>{countryName}</h1> */}
            <button 
              onClick={() => setModalOpen(true)} 
              className="add-address-button"
            >
              <FaPlus style={{ marginRight: 8 }} />
              Добавить адрес
            </button>
          </div>

          <div className="address-cards compact">
            {filtered.length > 0 ? (
              filtered.map((addr) => (
                <div key={addr.id} className="address-card">
                  <div className="card-header">
                    <h3>{addr.title}</h3>
                  </div>
                  <div className="address-details">
                    {addr.lines.slice(0, 3).map((line, idx) => (
                      <p key={idx}>
                        {line.includes('Телефон') && <FaPhone className="detail-icon" />}
                        {line.includes('Улица') && <FaMapMarkerAlt className="detail-icon" />}
                        {line.length > 30 ? `${line.substring(0, 30)}...` : line}
                      </p>
                    ))}
                  </div>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteAddress(addr.id)}
                  >
                    Удалить
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <h3>У вас пока нет адресов в этой стране</h3>
                <button 
                  onClick={() => setModalOpen(true)} 
                  className="add-address-button"
                >
                  <FaPlus style={{ marginRight: 8 }} />
                  Добавить адрес
                </button>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

const initialAddresses = [
  {
    id: 1,
    country: "us",
    title: "Нью-Йорк",
    lines: [
      "Фамилия: Б-4437, Усачев Сергей",
      "Улица: Эммонс-авеню, 3047",
      "Почтовый индекс: 11235",
      "Страна: США",
      "Город: Нью-Йорк",
      "Телефон: +19176057707"
    ],
  },
  {
    id: 2,
    country: "kr",
    title: "Сеул",
    lines: [
      "Фамилия: K-5578, Иванова Анна",
      "Улица: Gangnam-daero, 123",
      "Почтовый индекс: 06123",
      "Страна: Южная Корея",
      "Город: Сеул",
      "Телефон: +821077771234"
    ],
  }
];
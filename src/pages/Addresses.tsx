import { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaPlus, FaUser } from "react-icons/fa";
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
  const [selectedCountry, setSelectedCountry] = useState("it");
  const [addressList, setAddressList] = useState(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = addressList.filter((a) => a.country === selectedCountry);
  
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
                    <h2>{addr.title}</h2>
                  </div>
                  <div className="address-description">
                    {addr.description}
                  </div>
                  <div className="address-details">
                    <p>
                      <FaUser className="detail-icon" />
                      <strong>First name:</strong> {addr.firstName}
                    </p>
                    <p>
                      <FaUser className="detail-icon" />
                      <strong>Last name:</strong> {addr.lastName}
                    </p>
                    <p>
                      <FaMapMarkerAlt className="detail-icon" />
                      <strong>Street:</strong> {addr.street}
                    </p>
                    <p>
                      <FaMapMarkerAlt className="detail-icon" />
                      <strong>Country:</strong> {addr.countryName}
                    </p>
                    <p>
                      <FaMapMarkerAlt className="detail-icon" />
                      <strong>City:</strong> {addr.city}
                    </p>
                    <p>
                      <FaPhone className="detail-icon" />
                      <strong>Phone:</strong> {addr.phone}
                    </p>
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
    id: 2,
    country: "us",
    title: "Нью-Йорк",
    description: "",
    firstName: "",
    lastName: "Б-4437, Усачев Сергей",
    street: "Эммонс-авеню, 3047",
    countryName: "США",
    city: "Нью-Йорк",
    phone: "+19176057707"
  }
];
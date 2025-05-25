

import Sidebar from "../components/Sidebar/Sidebar";
import '../style/Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        {/* Здесь будут Header, Banner, StatusList, AddParcelButton */}
        <h1>Добро пожаловать в Panda Express!</h1>
      </main>
    </div>
  );
}




import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import '../style/Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        <Container>
        <Header />
        <h1>Добро пожаловать в Panda Express!</h1>
        </Container>
      </main>
    </div>
  );
}


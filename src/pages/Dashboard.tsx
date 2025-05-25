import type { FC } from "react";
import '../style/Dashboard.css'
import { Header } from "../components/Header/Header";
import { Banner } from "../components/Banner/Banner";
import { StatusList } from "../components/StatusList/StatusList";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Container } from "../components/Container/Container";

export const Dashboard:FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        <Container>
        <Header />
        <Banner />
        <StatusList />
        </Container>
      </main>
    </div>
  );
}


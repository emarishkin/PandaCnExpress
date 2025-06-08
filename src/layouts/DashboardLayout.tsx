import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Container } from "../components/Container/Container";
import { Header } from "../components/Header/Header";
import { Banner } from "../components/Banner/Banner";
import MobileNav from "../components/MobileNav/MobileNav";
import '../style/Dashboard.css'

type Props = {
  children: React.ReactNode;
  statusList?: React.ReactNode;  
};

export default function DashboardLayout({ children, statusList }: Props) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <Container>
          <Header />
          <Banner />

          <div className="dashboard-content">
  {statusList && <div className="dashboard-status">{statusList}</div>}
  <div className="dashboard-children">{children}</div>
</div>

        </Container>
      </main>
      <MobileNav />
    </div>
  );
}

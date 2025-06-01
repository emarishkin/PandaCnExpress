import type { FC } from "react";
import '../style/Dashboard.css'
import { Header } from "../components/Header/Header";
import { Banner } from "../components/Banner/Banner";
import { StatusList } from "../components/StatusList/StatusList";

// import { Container } from "../components/Container/Container";
import { AddParcelButton } from "../components/AddParcelButton/AddParcelButton";
import MobileNav from "../components/MobileNav/MobileNav";
import Sidebar from "../components/Sidebar/Sidebar";


export const Dashboard:FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        {/* <Container> */}
        <Header />
        <Banner />
        <StatusList />
        <AddParcelButton />
        <MobileNav />
        {/* </Container> */}
      </main>
    </div>
  );
}


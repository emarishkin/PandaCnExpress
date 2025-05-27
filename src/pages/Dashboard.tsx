import type { FC } from "react";
import '../style/Dashboard.css'
import { Header } from "../components/Header/Header";
import { Banner } from "../components/Banner/Banner";
import { StatusList } from "../components/StatusList/StatusList";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Container } from "../components/Container/Container";
import { AddParcelButton } from "../components/AddParcelButton/AddParcelButton";
import { MobileNav } from "../components/MobileNav/MobileNav";
<<<<<<< HEAD

=======
<i></i>
>>>>>>> 993bbb97e6b3432a08e523a0cefbac40f6d3c963
export const Dashboard:FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        <Container>
        <Header />
        <Banner />
        <StatusList />
        <AddParcelButton />
        <MobileNav />
        </Container>
      </main>
    </div>
  );
}


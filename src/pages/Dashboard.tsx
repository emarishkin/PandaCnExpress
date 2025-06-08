import { StatusList } from "../components/StatusList/StatusList";
import DashboardLayout from "../layouts/DashboardLayout";
import '../style/Dashboard.css'


export default function Dashboard() {
  return (
    <DashboardLayout statusList={<StatusList />}>
      <h2>Добро пожаловать!</h2>
    </DashboardLayout>
  );
}



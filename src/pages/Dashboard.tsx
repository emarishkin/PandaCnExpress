import { StatusList } from "../components/StatusList/StatusList";
import DashboardLayout from "../layouts/DashboardLayout";


export default function Dashboard() {
  return (
    <DashboardLayout statusList={<StatusList />}>
      <h2>Добро пожаловать!</h2>
    </DashboardLayout>
  );
}



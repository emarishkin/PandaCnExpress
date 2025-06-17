// Dashboard.tsx
import DashboardLayout from "../layouts/DashboardLayout";
import StatusList from "../components/StatusList/StatusList";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <StatusList />
    </DashboardLayout>
  );
}
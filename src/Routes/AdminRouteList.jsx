import Dashboard from "../Components/Admin/Dashboard";
import Dashboard2 from "../Components/Admin/Dashboard2";

const AdminRouteList = [
  { path: "/admin/dashboard", exact: true, name: "dashboard", component: Dashboard },
  { path: "/admin/dashboard2", exact: true, name: "dashboard2", component: Dashboard2 },
];

export default AdminRouteList;

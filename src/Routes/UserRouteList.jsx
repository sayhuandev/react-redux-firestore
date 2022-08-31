// Components
import Page403 from "../Components/Error/Page403"
import Page404 from "../Components/Error/Page404"
import Home from "../Components/User/Home";

const UserRouteList = [
  { path: "/home", exact: true, name: "Home", component: Home },
  { path: "/403", exact: true, name: "Page403", component: Page403 },
  { path: "/404", exact: true, name: "Page404", component: Page404 },
];

export default UserRouteList;

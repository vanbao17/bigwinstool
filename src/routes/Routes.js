import Accounts from "../Components/Layouts/Accounts/Accounts";
import Admin from "../Components/Layouts/Admin/Admin";
import Class from "../Components/Layouts/Class/Class";
import Games from "../Components/Layouts/Games/Games";
import Home from "../Components/Layouts/Home/Home";
import Login from "../Components/Layouts/Login/Login";
import PageAtemp from "../Components/Layouts/PageAtemp/PageAtemp";
import Register from "../Components/Layouts/Register/Register";
import routes from "../configs/Configs";

const publicRoutes = [
  {
    path: routes.home,
    component: Home,
    layout: PageAtemp,
  },
  {
    path: routes.admin,
    component: Admin,
  },
  {
    path: routes.phong,
    component: Class,
  },
  {
    path: routes.game,
    component: Games,
  },
  {
    path: routes.login,
    component: Login,
    layout: PageAtemp,
  },
  {
    path: routes.register,
    component: Register,
    layout: PageAtemp,
  },
];
export default publicRoutes;

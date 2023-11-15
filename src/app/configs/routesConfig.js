import { Navigate } from 'react-router-dom';
import Error404Page from '../pages/error/404/Error404Page';
import settingsConfig from "./settingsConfig";
import HomeConfig from "../pages/home/HomeConfig";
import FuseUtils from '../../@fuse/utils';
import SignInConfig from "../pages/auth/sign-in/SignInConfig";
import DashboardMainConfig from "../pages/dashboard/main/DashboardMainConfig";
import SignOutConfig from "../pages/auth/sign-out/SignOutConfig";
import CartConfig from "../pages/dashboard/cart/CartConfig";
import SignUpConfig from "../pages/auth/sign-up/SignUpConfig";

const routeConfigs = [HomeConfig, SignInConfig, SignOutConfig, SignUpConfig, DashboardMainConfig, CartConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;

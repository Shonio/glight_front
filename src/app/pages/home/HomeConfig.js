import Example from './Home';
import {authRoles} from "../../auth";

const HomeConfig = {
  settings: {
    layout: {
      style: 'layoutMain',
      config: {},
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/',
      element: <Example />,
    },
  ],
};

export default HomeConfig;
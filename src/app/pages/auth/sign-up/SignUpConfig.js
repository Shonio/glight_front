import authRoles from "../../../auth/authRoles";
import SignUp from "./SignUp";

const SignOutConfig = {
  settings: {
    layout: {
      style: 'layoutMain',
      config: {
        navbar: {
          show: true,
          isLoginForm: true,
        },
        footer: false,
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/sign-up',
      element: <SignUp />,
    },
  ],
};

export default SignOutConfig;

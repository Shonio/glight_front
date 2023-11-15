import SignInPage from './SignInPage';
import authRoles from '../../../auth/authRoles';

const SignInConfig = {
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
      path: 'sign-in',
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;

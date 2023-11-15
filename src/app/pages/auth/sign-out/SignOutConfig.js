import SignOutPage from './SignOutPage';

const SignOutConfig = {
  settings: {
    layout: {
      style: 'layoutMain',
      config: {
        navbar: {
          show: false,
          logo_position: 'left',
        },
        footer: false,
      },
    },
  },
  auth: null,
  routes: [
    {
      path: 'sign-out',
      element: <SignOutPage />,
    },
  ],
};

export default SignOutConfig;

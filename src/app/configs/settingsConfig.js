const settingsConfig = {
    layout: {
        style: 'layoutMain',
        config: {}, // checkout default layout configs at app/theme-layouts for home  app/theme-layouts/layout1/LayoutMainConfig.js
    },
    /*
     To make whole app auth protected by default set defaultAuth:['admin','staff','user']
     To make whole app accessible without authorization by default set defaultAuth: null
     *** The individual route configs which has auth option won't be overridden.
     */
    defaultAuth: ['admin'],
    /*
      Default redirect url for the logged-in user,
     */
    loginRedirectUrl: '/user/dashboard',
};

export default settingsConfig;
import {Provider} from 'react-redux'
import store from './store';
import AppContext from './AppContext';
import routes from "./configs/routesConfig";

const withAppProviders = (Component) => (props) => {
    const WrapperComponent = () => (
        <AppContext.Provider
            value={{
                routes,
            }}
        >
            <Provider store={store}>
                <Component {...props} />
            </Provider>
        </AppContext.Provider>
    );

    return WrapperComponent;
};

export default withAppProviders;

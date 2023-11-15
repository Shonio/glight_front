import {combineReducers, configureStore} from '@reduxjs/toolkit';
import settings from './settingsSlice';
import user from './userSlice';
import cart from './cartSlice';
import signUpSlice from './signUpSlice'
import powerPlants from './powerPlantsSlice';

const createReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        cart: cart,
        powerPlants: powerPlants,
        settings: settings,
        user: user,
				signUp: signUpSlice,
        ...asyncReducers,
    });

    return combinedReducer(state, action);
};

const store = configureStore({
    reducer: createReducer(),
});

export default store;

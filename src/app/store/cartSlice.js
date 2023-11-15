import { createSlice } from "@reduxjs/toolkit";

const calculateRemainingAvailablePower = (state) => {
	state.remainingAvailablePower =
		state.userBaseAvailablePower -
		state.products.reduce((acc, product) => acc + product.amountOfEnergy, 0);
};

const localState = window.localStorage.getItem("cartState");

const initialState = localState
	? JSON.parse(localState)
	: {
			userBaseAvailablePower: 1200,
			remainingAvailablePower: 1200,
			products: [],
			history: [],
	  };

const userSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addProductToCart: (state, action) => {
			action.payload.cartItemId =
				Math.max(...state.products.map((product) => product.cartItemId), 0) + 1;
			state.products.push(action.payload);
			calculateRemainingAvailablePower(state);
		},
		deleteProductFromCart: (state, action) => {
			state.products = state.products.filter(
				(product) => product.cartItemId !== action.payload
			);
			calculateRemainingAvailablePower(state);
		},
		updateProduct: (state, action) => {
			state.products = state.products.map((product) => {
				if (product.cartItemId === action.payload.cartItemId) {
					return action.payload;
				}
				return product;
			});

			calculateRemainingAvailablePower(state);
		},
		clenUpCart: (state) => {
			state.history = state.products;
			state.products = [];
			calculateRemainingAvailablePower(state);
			console.log(123,state.history);
		},
	},
	extraReducers: {},
});

export const {
	addProductToCart,
	deleteProductFromCart,
	updateProduct,
	clenUpCart,
} = userSlice.actions;

export const selectRemainingAvailablePower = ({ cart }) =>
	cart.remainingAvailablePower;
export const selectProducts = ({ cart }) => cart.products;
export const getHistory = ({ cart }) => cart.history;

const persistedReducer = (state, action) => {
	const persistActions = [
		"cart/addProductToCart",
		"cart/deleteProductFromCart",
		"cart/updateProduct",
		"cart/clenUpCart",
	];

	const nextState = userSlice.reducer(state, action);
	if (persistActions.includes(action.type)) {
		localStorage.setItem("cartState", JSON.stringify(nextState));
	}

	return nextState;
};

export default persistedReducer;

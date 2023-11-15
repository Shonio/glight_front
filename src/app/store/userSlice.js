/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "../../@history";
import _ from "../../@lodash";
import { setInitialSettings } from "./settingsSlice";
import settingsConfig from "../configs/settingsConfig";
import jwtService from "../auth/services/jwtService";

export const setUser = createAsyncThunk(
	"user/setUser",
	async (user, { dispatch, getState }) => {
		/* You can redirect the logged-in user to a specific route depending on his role */
		if (user.loginRedirectUrl) {
			settingsConfig.loginRedirectUrl = user.loginRedirectUrl;
		}

		return user;
	}
);

export const updateUserSettings = createAsyncThunk(
	"user/updateSettings",
	async (settings, { dispatch, getState }) => {
		const { user } = getState();
		const newUser = _.merge({}, user, { data: { settings } });

		dispatch(updateUserData(newUser));

		return newUser;
	}
);

export const updateUserShortcuts = createAsyncThunk(
	"user/updateShortucts",
	async (shortcuts, { dispatch, getState }) => {
		const { user } = getState();
		const newUser = {
			...user,
			data: {
				...user.data,
				shortcuts,
			},
		};

		dispatch(updateUserData(newUser));

		return newUser;
	}
);

export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState();

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	history.push({
		pathname: "/",
	});

	dispatch(setInitialSettings());

	return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}

	jwtService
		.updateUserData(user)
		.then(() => {
			// log success
			// dispatch(showMessage({ message: 'User data saved with api' }));
			console.warn("User data saved with api");
		})
		.catch((error) => {
			// log error
			// dispatch(showMessage({ message: error.message }));
			console.warn(error);
		});
};

const initialState = {
	role: [], // guest
	data: {},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userLoggedOut: (state, action) => initialState,
	},
	extraReducers: {
		[updateUserSettings.fulfilled]: (state, action) => action.payload,
		[updateUserShortcuts.fulfilled]: (state, action) => action.payload,
		[setUser.fulfilled]: (state, action) => action.payload,
	},
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;
export const selectUserSubscriptions = ({ user }) => user.subscriptions;
export const selectUserTransactions = ({ user }) => user.transactions;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;

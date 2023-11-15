import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getPowerPlants = createAsyncThunk(
    'api/user/dashboard/findAll',
    async (mockOfPlants, {dispatch, getState}) => {

        const response = await axios.get(
            `api/user/dashboard/findAll`,
            {data: mockOfPlants}
        );

        const data = await response.data;
        return data === undefined ? [] : data;
    });

const powerPlantsSlice = createSlice({
    name: 'user/dashboard/powerPlants',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getPowerPlants.fulfilled]: (state, action) => action.payload,
    },
});

export const selectPowerPlants = ({powerPlants}) => powerPlants;

export default powerPlantsSlice.reducer;
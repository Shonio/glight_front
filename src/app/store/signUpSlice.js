import { Login } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	dataRegistration: {},
	step: 1,
	stepOne: {},
	stepTwo: {},
	stepThree: {},
}

export const signUpSlice = createSlice({
	name: 'signUp',
	initialState,
	reducers: {
		setStep(state, action) {
			state.step = action.payload
		},
		setStepOne(state, action) {
			state.stepOne = action.payload
			console.log(state.stepOne)
		},
		setStepTwo(state, action) {
			state.stepTwo = action.payload
			console.log(state.stepTwo)
		},
		setStepThree(state, action) {
			state.stepThree = action.payload
			console.log(state.stepThree)
			
			state.dataRegistration = {
				...state.stepOne,
				...state.stepTwo,
				...state.stepThree,
			}
			console.log(state.dataRegistration)
		}
	}
})

export const {setStep, setStepOne, setStepTwo, setStepThree} = signUpSlice.actions


export default signUpSlice.reducer;


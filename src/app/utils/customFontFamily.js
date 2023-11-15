import { createTheme } from '@mui/material/styles';


export const customFontFamily = createTheme({
	typography: {
		fontFamily: [
			'-apple-system',
			"Public Sans",
			'"Segoe UI"',
			'Roboto',
			'Arial',
			'sans-serif',
		].join(','),
	}
})
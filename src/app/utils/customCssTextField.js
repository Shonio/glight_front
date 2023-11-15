import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CssTextField = styled(TextField)({
	marginBottom: '20px',
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			border: 'none',
			background: 'rgba(145, 158, 171, 0.08)',
    },
		
	},
	'& label.Mui-focused': {
		color: '#919EAB',
	},
})
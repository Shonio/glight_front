import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

export const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: '#007B55',
			background: 'rgba(0, 171, 85, 0.16)',
			borderRadius: '8px',
			padding: '6px 0',
			textAlign: 'center',
			width: '184px',
    },
		'.MuiTypography-root': {
			borderRadius: '8px',
			padding: '6px 0',
			textAlign: 'center',
			width: '184px',
		},
		'.MuiRadio-root': {
			display: 'none'
		},
		color: '#637381',
		margin: '0'
  }),
);
import { SvgIcon } from '@mui/material'
import React from 'react'

export const EditSvg = (props) => {
	return (
		<SvgIcon {...props} sx={{marginLeft: '5px', marginTop: '6px'}}>
			<path
				d="M13.6603 0.599983L16.4003 3.33998C17.1663 4.06975 17.1976 5.28164 16.4703 6.04998L7.4703 15.05C7.14434 15.3732 6.7171 15.5745 6.2603 15.62L2.0903 16H2.0003C1.7345 16.0015 1.47902 15.8972 1.2903 15.71C1.07934 15.4998 0.973027 15.2065 1.0003 14.91L1.4303 10.74C1.47581 10.2832 1.67707 9.85595 2.0003 9.52998L11.0003 0.529983C11.7761 -0.125466 12.92 -0.0953635 13.6603 0.599983ZM10.3203 3.99998L13.0003 6.67998L15.0003 4.72998L12.2703 1.99998L10.3203 3.99998Z"
			/>
		</SvgIcon>
	)
}

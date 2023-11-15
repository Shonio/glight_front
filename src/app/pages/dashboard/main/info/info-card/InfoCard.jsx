import { Typography } from '@mui/material'
import React from 'react'
import './info-card.css'

const InfoCard = (props) => {
	return (
		<div className='infoCard'>
			<div className="infoCard-info">
				<Typography
					sx={{
						fontWeight: 600,
						fontSize: '16px',
						lineHeight: '24px',
						color: '#212B36',
						marginBottom: '8px',
					}}
				>
					{props.title}
				</Typography>

				<Typography
					sx={{
						color:' #637381',
						marginRight: '11px'
					}}
				>
					{props.text}
				</Typography>
			</div>

			<img src={props.src} alt="info-img" />
		</div>
	)
}

export default InfoCard;

import {Typography} from '@mui/material'
import React from 'react'
import './subscription-panel-card.css'

const SubscriptionPanelCard = ({endOfMonth, subscription: {amount, price, type}, product: {title}}) => {
	const typeTransaction = {'ONCE': 'Разово', 'MONTHLY': 'Ежемесячно'};

	return (
		<div className='writeOffsCard'>
			<div className='writeOffsCard__nameStation'>
				<Typography
					sx={{
						fontWeight: 600,
						color: '#212B36',
					}}
				>{title}</Typography>
				<Typography
					sx={{
						color: '#637381',
					}}
				>{amount} кВт*ч</Typography>
			</div>

			<Typography
				sx={{
					fontWeight: 400,
					fontSize: '14px',
					lineHeight: '22px',
					color: '#212B36',
					marginRight: '32px'
				}}
			>{endOfMonth}</Typography>
			<Typography
				sx={{
					fontWeight: 400,
					fontSize: '14px',
					lineHeight: '22px',
					color: '#212B36',
					textAlign: 'center',

				}}
			>{price} ₸</Typography>

			<p style={type === 'ONCE'
				? {color: '#FFAB00', border: '1px solid rgba(255, 171, 0, 0.48)'}
				: {color: '#36B37E', border: '1px solid rgba(54, 179, 126, 0.48)'}
			} className="where">{typeTransaction[type]}</p>

		</div>
	)
}

export default SubscriptionPanelCard

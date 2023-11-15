import { Typography } from '@mui/material'
import React from 'react'
import './purchase-panel.css'

const PurchasePanelCard = ({item: {date, money, name, power}}) => {
	const convertDateTimeToLocalFormat = (dateTime) => {
		const date = new Date(dateTime);
		const options = { day: 'numeric', month: 'long', year: 'numeric' };
		const russianDate = new Intl.DateTimeFormat('ru-RU', options).format(date);

		return russianDate.slice(0, -2).trim();
	}

	return (
		<div className='cardPurchaseHistory'>
			<div className="cardPurchaseHistory__header">
				<Typography
					sx={{
						fontSize: '12px',
						lineHeight: '18px',
						color: '#637381',
					}}
				>
					{convertDateTimeToLocalFormat(date)}
				</Typography>
			</div>

			<div className="cardPurchaseHistory__info">
				<Typography 
					sx={{
						fontSize: '16px',
						lineHeight: '24px',
						color: '#212B36',
					}}
				>
					{name}
				</Typography>
				<div>
					<Typography
						sx={{
							color: '#212B36',
							fontWeight: 600,
						}}
					>
						{money} ₸
					</Typography>

					<Typography
						sx={{
							color: '#637381',
						}}
					>
						{power} кВт*ч
					</Typography>
				</div>
			</div>
		</div>
	)
}

export default PurchasePanelCard

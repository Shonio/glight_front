import { Typography } from '@mui/material'
import React from 'react'
import './card-product-list.css'

const CardProductList = (props) => {
	return (
		<div className='productMainCard' onClick={props.onClick}>
			<div className="productMainCard__row productMainCard__line">
				<Typography
					sx={{
						fontWeight: 700,
						fontSize: '18px',
						lineHeight: '28px',
						color: '#212B36',
					}}
				>
					{props.name}
				</Typography>

				<Typography
					sx={{
						fontWight: 600,
						fontSize: '14px',
						lineHeight: '22px',
						color: '#00AB55',
						padding: '4px 12px',
						border: '1px solid rgba(0, 171, 85, 0.48)',
						borderRadius: '6px',
					}}
				>
					{props.price} ₸/кВт*ч 
				</Typography>
			</div>

			<div className="productMainCard__row">
				<div className="productMainCard__col">
					<Typography
						sx={{
							color: '#637381',
						}}
					>Местоположение</Typography>
					<Typography
						sx={{
							color: '#212B36',
						}}
					>{props.location}</Typography>
				</div>

				<div className="productMainCard__col">
					<Typography
						sx={{
							color: '#637381',
						}}
					>Мощность станции</Typography>
					<Typography
						sx={{
							color: '#212B36',
						}}
					>{props.powerStation} МВт</Typography>
				</div>

				<div className="productMainCard__col">
					<Typography
						sx={{
							color: '#637381',
							paddingRight: '40px'
						}}
					>Доступная энергия</Typography>
					<Typography
						sx={{
							color: '#212B36',
						}}
					>{props.availableEnergy} МВт</Typography>
				</div>
			</div>
		</div>
	)
}

export default CardProductList

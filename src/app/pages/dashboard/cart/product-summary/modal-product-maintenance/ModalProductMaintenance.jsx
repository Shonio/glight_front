import {Box, Typography} from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
import {clenUpCart} from "../../../../../store/cartSlice";
import {useDispatch} from "react-redux";

export const ModalProductMaintenance = () => {
	const dispatch = useDispatch();
	// ---------------------------------------------

	return (
		<Box sx={{
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: 400,
			bgcolor: '#FFFFFF',
			padding: '52px 24px 24px 24px',
			boxShadow: '-40px 40px 80px -8px rgba(145, 158, 171, 0.24)',
			borderRadius: '16px',
			textAlign: 'center'
		}}>

			<img src={'assets/images/check.png'} alt="check" />

			<Typography id="modal-modal-title" variant="h6" component="h2"
				sx={{
					fontWeight: 700,
					fontSize: '18px',
					lineHeight: '28px',
					color: '#212B36',
				}}
			>
				Ошибочка вышла :(
			</Typography>
			<Typography id="modal-modal-description" sx={{ 
					mt: 3, 
					fontSize: '16px',
					lineHeight: '24px',
					color: '#637381',
					mb: 2
				}}>
				К сожалени в данный момент мы не можем обработать вашу заявку. Пожалуйста, попробуйте позже.
			</Typography>

			<Link onClick={() => dispatch(clenUpCart())} className="emptyCart__btn" to="/user/dashboard" style={{display: 'block'}}>
				Очистить корзину
			</Link>
		</Box>
	)
}

import {Modal, Typography} from '@mui/material';
import * as React from 'react';
import {CustomButton} from '../../../../utils/customButton'
import {ModalProductSummary} from './modal-product-summary/ModalProductSummary';
import './product-summary.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { clenUpCart } from '../../../../store/cartSlice';
import {ModalProductMaintenance} from "./modal-product-maintenance/ModalProductMaintenance";

function ProductSummary({products}) {
	const dispatch = useDispatch();
	// ---------------------------------------------

	const [open, setOpen] = React.useState(false);
	const [summary, setSummary] = React.useState({});

	// ---------------------------------------------

	useEffect(() => {
		const tmp = {
			products: [], totalOnes: 0, totalEveryMonth: 0, total: 0,
		};

		products.forEach((product) => {
			const productIndex = tmp.products.findIndex((p) => p.title === product.title);
			if (productIndex === -1) {
				tmp.products.push({
					title: product.title, 
					totalPrice: product.totalPrice,
				});
			} else {
				tmp.products[productIndex].totalPrice += product.totalPrice;
			}

      tmp.total += product.totalPrice;

			if (product.buyType === 'ONCE') {
				tmp.totalOnes += product.totalPrice;
			} else {
				tmp.totalEveryMonth += product.totalPrice;
			}
    });

        setSummary(tmp);
    }, [products]);
	// ---------------------------------------------

    return (
			<div className='productSummary'>

				<div className={'productSummary__products'}>
						{
							summary.products && summary.products.map((product, i) => (
								<div className='productSummary__product' key={i}>
									<Typography
										sx={{
											color: '#637381',
										}}
									>{product.title}</Typography>
									<Typography
										sx={{
											color: '#212B36',
										}}
									>{product.totalPrice} ₸</Typography>
								</div>
						))}
				</div>

				<div className={'productSummary__total-ones-and-total-every-month'}>
						<div className='productSummary__product'>
							<Typography
								sx={{
									color: '#212B36',
								}}
							>Разово</Typography>
							<Typography
								sx={{
									color: '#212B36',
								}}
							>{summary.totalOnes} ₸</Typography>
						</div>

						<div className='productSummary__product'>
							<Typography
								sx={{
									color: '#212B36',
								}}
							>Ежемесячно</Typography>
							<Typography
								sx={{
									color: '#212B36',
								}}
							>{summary.totalEveryMonth} ₸</Typography>
						</div>
				</div>
				
				<div className={'productSummary__total'}>
					<Typography
						sx={{
							color: '#212B36',
						}}
					>Всего</Typography>
					<Typography
						sx={{
							fontWeight: 600,
							fontSize: '16px',
							lineHeight: '24px',
							color: '#FF5630',
						}}
					>{summary.total} ₸</Typography>
				</div>

				<div className={'product-summary__total'}>
						{/* add MUI button full size of block, light green color, rounded 8px, text 'Оплатить'  */}
						<CustomButton onClick={() => setOpen(true)}
							sx={{
								width: '100%',
								backgroundColor: '#4caf50',
								color: 'white',
								fontSize: '15px',
								lineHeight: '26px',
								textTransform: 'capitalize',
								padding: '11px 0',
								'&:hover': {
										backgroundColor: '#00AB55'
								},
							}}
						>Оплатить</CustomButton>

						<Typography
							sx={{
								fontSize: '12px',
								lineHeight: '18px',
								color: '#637381',
								textAlign: 'center',
								marginTop: '16px'
							}}
						>
							Нажимая кнопку “Оплатить”, я принимаю публичную оферту и даю согласие на обработку персональных
							данных
						</Typography>
				</div>

				<Modal
						open={open}
						onClose={() => {
							dispatch(() => clenUpCart())
							setOpen(false)
						}}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
				>
					{/*<ModalProductSummary/>*/}
					<ModalProductMaintenance />
				</Modal>

						

      </div>
    );
}

export default ProductSummary;

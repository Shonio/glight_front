import {IconButton, Modal, Typography} from '@mui/material';
import {Box} from '@mui/system';
import * as React from 'react';
import {DeleteSvg} from './custom-svg/DeleteSvg';
import {EditSvg} from './custom-svg/EditSvg';
import './product-item.css';
import {useDispatch} from "react-redux";
import {deleteProductFromCart} from "../../../../../store/cartSlice";
import ModalProductDetail from "../../../shared-component/modal-product-detail/ModalProductDetail";
import {useState} from "react";

function ProductItem({item}) {
	console.log('ProductItem: ', item)
	const dispatch = useDispatch();
	let typeTranslation = {ONCE: 'Разово', MONTHLY: 'Ежемесячно'};
	// ---------------------------------------------

	const [open, setOpen] = useState(false);
	// ---------------------------------------------

	return (
		<div className='productItem'>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalProductDetail
					product={item}
					closed={() => setOpen(false)}
					mode={'update'}
				/>
			</Modal>

			<div className="productItem__header">
				<Typography
					sx={{
						fontWeight: 700,
						fontSize: '18px',
						lineHeight: '28px',
						color: '#212B36',
					}}
				>
					{item.title}
						</Typography>

						<Box>
							<IconButton onClick={() => setOpen(true)} aria-label="edit-icon">
								<EditSvg />
							</IconButton>

							<IconButton onClick={() => dispatch(deleteProductFromCart(item.cartItemId))} aria-label="edit-icon">
								<DeleteSvg/>
							</IconButton>
						</Box>
					</div>

					<div className="productItem__row">
						<div className="productItem__col">
							<Typography
								sx={{
									color: '#637381',
								}}
							>Кол-во энергии</Typography>
							<Typography
								sx={{
									color: '#212B36',
								}}
							>{item.amountOfEnergy}</Typography>
						</div>

						<div className="productMainCard__col">
							<Typography
								sx={{
									color: '#637381',
								}}
							>Цена за 1 кВт*ч</Typography>
							<Typography
								sx={{
									color: '#212B36',
								}}
							>{item.price} ₸</Typography>
						</div>

						<div className="productMainCard__col">
							<Typography
								sx={{
									color: '#637381',
								}}
							>Покупка энергии</Typography>
							<Typography
								sx={{
									color: '#212B36',
								}}
							>{typeTranslation[item.buyType]}</Typography>
						</div>

						<Typography
							sx={{
								fontWeight: 700,
								fontSize: '18px',
								lineHeight: '28px',
								color: '#212B36',
							}}	
						>
							{item.totalPrice} ₸
						</Typography>
					</div>

            {/* {Object.keys(item).map((key, i) => (
                <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <span>{key}:</span><span>{item[key]}</span>
                </div>

            ))} */}
        </div>
    );
}

export default ProductItem;

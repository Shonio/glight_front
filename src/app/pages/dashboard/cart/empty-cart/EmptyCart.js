import { Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../../../utils/customButton';
import './empty-cart.css';
function EmptyCart(props) {
    return (
        <div className='emptyCart'>
          <h4 className="dashboardMain__title" style={{marginBottom: '24px'}}>Корзина</h4>

						<div >

							<img src={'assets/images/empty-cart-img.png'} alt="empty-cart" />
							<Typography
								sx={{
									fontWeight: 400,
									fontSize: '16px',
									lineHeight: '24px',
									color: '#212B36',
									paddingBottom: '32px'
								}}
							>Ваша корзина пуста</Typography>

							<Link className="emptyCart__btn" to="/user/dashboard">
								Купить энергию
							</Link>
						</div>
        </div>
    );
}

export default EmptyCart;


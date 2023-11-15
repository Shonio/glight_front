import { Typography } from '@mui/material';
import * as React from 'react';
import './payment-info.css';

function PaymentInfo(props) {
    return (
        <div className='paymentInfo'>
            <Typography 
							sx={{
								fontWeight: 600,
								fontSize: '16px',
								lineHeight: '24px',
								color: '#637381'
							}}		
						>Как происходит оплата</Typography>

            <p className='paymentInfo__text'>
                1. После оплаты деньги зачисляются на ваш баланс, и за вами на месяц бронируется то количество «зелёной»
                энергии, которое вы оплатили
                <br/><br/>
                2. По истечении месяца с баланса списывается сумма за фактически использованную вами «зелёную» энергию
            </p>
        </div>
    );
}

export default PaymentInfo;


import { Button, Typography } from "@mui/material";
import {useState} from "react";
import CardPurchaseHistory from "./card-purchase-history/CardPurchaseHistory";
import "./purchase-history.css";

function PurchaseHistory(props) {
    const [historyItems, setHistoryItems] = useState([
			{
				date: '25 октября 2022',
				name: 'Верхне-Алматинская ГЭС',
				money: '-4 480',
				power: 80,
			},
	
			{
				date: '25 сентября 2022',
				name: 'Верхне-Алматинская ГЭС',
				money: '-4 480',
				power: 80,
			},
	
			{
				date: '16 августа 2022',
				name: 'СЭС «Капшагай»',
				money: '-1 200',
				power: 80,
			},
		]);

    // useEffect(() => {
    //     const products = [];
    //     for (let i = 0; i < 5; i++) {
    //         products.push({
    //             id: i,
    //             date: `Date ${i}`,
    //             title: `Title ${i}`,
    //             price: Math.floor(Math.random() * 1000),
    //             power: Math.floor(Math.random() * 1000),
    //         });
    //     }
    //     setHistoryItems(products);
    // }, []);

    return (
        <div className="purchaseHistory">
          <h4 className="dashboardMain__title">История покупок</h4>

					<div className="purchaseHistory__blocks">
						{
							historyItems.map( (el, i) => {
								return <CardPurchaseHistory
												key={i}
												date={el.date}
												name={el.name}
												money={el.money}
												power={el.power}
											/>
							})
						}

						{
							historyItems.length >=3 
							?
							<div className="purchaseHistory__btn">
								<Button
									sx={{
										width: '100%',
										background: 'rgba(145, 158, 171, 0.08) url(assets/images/arrow-right-icon.svg) no-repeat 60% center',
										borderRadius: '8px',
										padding: '4px 0',
										fontWeight: 700,
										fontSize: '13px',
										color: '#212B36',
									}}
								>
									Показать все
								</Button>
							</div>
							:
							null
						}

						{
							historyItems.length === 0
							? 
							<div style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								height: '100%'
							}}>

								<div style={{
									width: '189px',
									textAlign: 'center',
								}}>
									<img src={'assets/images/history-img.png'} alt="history-img" />
									<Typography
										sx={{
											color: '#212B36',
										}}
									>У вас пока нет совершенных покупок</Typography>
								</div>
							</div>
							: null
						}
					</div>
        </div>
    );
}


export default PurchaseHistory;

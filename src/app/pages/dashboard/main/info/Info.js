import "./info.css";
import InfoCard from "./info-card/InfoCard";

function Info(props) {
	
	const cardInfo = [
		{
			title: 'Подписка на «зелёную» энергию',
			text: 'Покупайте «зелёную» энергию ежемесячно с автоплатежом',
			img: 'assets/images/info-card-img/promo1.png'
		},
		{
			title: 'Зачем нужен баланс',
			text: 'Как происходит списание средств с баланса и когда его нужно пополнять',
			img: 'assets/images/info-card-img/promo2.png'
		},
		{
			title: 'Доступное количество энергии',
			text: 'Почему «зелёная» энергия, доступная для покупки, ограничена',
			img: 'assets/images/info-card-img/promo3.png'
		},
	]

	return (
		<div className="info-blocks">
			{
				cardInfo.map( (el, i) => {
					return <InfoCard
									key={i}
									title={el.title}
									text={el.text}
									src={el.img}
								/>
				})
			}
		</div>
	);
}

export default Info;

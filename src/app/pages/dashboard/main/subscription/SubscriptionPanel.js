import {useEffect, useState} from "react";
import "./subscription-panel.css"
import SubscriptionPanelCard from "./subscription-panel-card/SubscriptionPanelCard";
import SubscriptionPanelCardSkeleton from "./subscription-panel-card/SubscriptionPanelCardSkeleton";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUserSubscriptions} from "../../../../store/userSlice";
import DataLoadErrorState from "./panel-state/DataLoadErrorState";
import EmptyDataState from "../../shared-component/panel-state/EmptyDataState";

function SubscriptionPanel(props) {
	// const subscriptions = useSelector(selectUserSubscriptions);
	const subscriptions = []

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [endOfMonth, setEndOfMonth] = useState(null);
	const [dataLoadingError, setDataLoadingError] = useState(false);

	useEffect(() => {
		setDataLoadingError(false);
		setLoading(false);

		// if (subscriptions.length === 0) {
		// 	setLoading(false);
		// } else {
		// 	const ids = subscriptions.map(subscription => subscription.productId)
		// 		.filter((uuid, i, arr) => arr.indexOf(uuid) === i);
		// 	axios.get('api/user/dashboard/findPlantsByIds', {data: {ids}})
		// 		.then((res) => {
		// 			if (res.status === 200 && res.data.length === ids.length) {
		// 				setProducts(res.data);
		// 			} else {
		// 				setDataLoadingError(true);
		// 			}
		// 		})
		// 		.catch((err) => {
		// 			setDataLoadingError(true);
		// 		})
		// 		.finally(() => {
		// 			setLoading(false);
		// 		});
		// }

	}, [subscriptions]);

	useEffect(() => {
		const calculatedEndOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
			.toLocaleString('ru', {day: 'numeric', month: 'long'});
		setEndOfMonth(calculatedEndOfMonth);
	}, []);

	const renderSubscriptionComponent = subscriptions.map((subscription, i) => {
		const product = products.find(product => product.id === subscription.productId);
		return <SubscriptionPanelCard key={i}
									  endOfMonth={endOfMonth}
									  subscription={subscription}
									  product={product}
		/>
	});

	const renderDependingOnLoadingErrorState = dataLoadingError ?
		<DataLoadErrorState message={`Ошибка загрузки данных`}/> : renderSubscriptionComponent;

	return (
		<div>
			<h4 className="dashboardMain__title">Предстоящие списания</h4>
			{
				<EmptyDataState message={'У вас пока нет активных подписок'}/>
				// loading
				// 	? new Array(subscriptions.length).fill(1).map((el, i) =>
				// 		<SubscriptionPanelCardSkeleton key={i}/>)
				// 	: renderDependingOnLoadingErrorState
			}
		</div>
	);
}

export default SubscriptionPanel;

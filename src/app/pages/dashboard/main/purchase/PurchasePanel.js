import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import PurchasePanelCard from "./purchase-panel-card/PurchasePanelCard";
import "./purchase-panel.css";
import {useSelector} from "react-redux";
import {selectUserTransactions} from "../../../../store/userSlice";
import EmptyDataState from "../../shared-component/panel-state/EmptyDataState";
import DataLoadErrorState from "./panel-state/DataLoadErrorState";
import PurchasePanelCardSkeleton from "./purchase-panel-card/PurchasePanelCardSkeleton";
import axios from "axios";
import { getHistory } from "../../../../store/cartSlice";

function PurchasePanel(props) {
	const transactions = useSelector(selectUserTransactions);

	const history = useSelector(getHistory);
	console.log('history',history);
	// ------------------------------------------------------------

	const [loading, setLoading] = useState(true);
	const [dataLoadingError, setDataLoadingError] = useState(false);
	const [purchase, setPurchase] = useState([]);

	// ------------------------------------------------------------
	useEffect(() => {
		setDataLoadingError(false);
		setLoading(false);
	}, [transactions]);

	/* useEffect(() => {
		setDataLoadingError(false);
		setLoading(true);

		if (transactions.length === 0) {
			setLoading(false);
		} else {
			const ids = getProductUniqueIdsFromTransactionsSortedByDate();
			axios.get(
				'api/user/dashboard/findPlantsByIds',
				{data: {ids}, limit: 3}
			).then((res) => {
				if (res.status === 200 && res.data.length === ids.length) {
					const purchase = [];
					for (const element of ids) {
						const plant = res.data.find((el) => el.id === element);
						const transaction = transactions.find((el) => el.products.find((product) => product.id === element));
						const product = transaction.products.find((product) => product.id === element);

						purchase.push({
							date: transaction.date,
							name: plant.title,
							money: product.price,
							power: product.amount,
						});
					}

					setPurchase(purchase);
				} else {
					setDataLoadingError(true);
				}
			}).catch((err) => {
				setDataLoadingError(true);
			}).finally(() => {
				setLoading(false);
			});
		}
	}, [transactions]);*/

	// // ------------------------------------------------------------
	const getProductUniqueIdsFromTransactionsSortedByDate = (limit = 3) => {
		const ids = [];

		transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
		for (let i = 0; i < transactions.length && ids.length < 3; i++) {
			for (let j = 0; j < transactions[i].products.length && ids.length < 3; j++) {
				if (!ids.includes(transactions[i].products[j].id)) {
					ids.push(transactions[i].products[j].id);
				}
			}
		}

		return ids;
	}

	// ------------------------------------------------------------

	const loadMoreButton = <div className="purchaseHistory__btn">
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
	</div>;

	const renderFullDataState = () => {
		if (purchase.length > 2) {
			return (
				<div>
					{purchase.slice(0, 3).map((el, i) => <PurchasePanelCard key={i} item={el}/>)}
					{loadMoreButton}
				</div>
			);
		} else {
			console.log('purchase', purchase)
			return purchase.map((el, i) => <PurchasePanelCard key={i} item={el}/>);
		}
	}

	const renderLoadedData = purchase.length === 0
		? <EmptyDataState message={'У вас пока нет совершенных покупок'}/>
		: renderFullDataState();

	const renderDependingOnLoadingErrorState = dataLoadingError
		? <DataLoadErrorState message={`Ошибка загрузки данных`}/>
		: renderLoadedData;

	const renderCardPlaceholder = new Array(4).fill(1)
		.map((el, i) => <PurchasePanelCardSkeleton key={i}/>);

	return (
		<div className="purchaseHistory">
			<h4 className="dashboardMain__title">История покупок</h4>
			<div className="purchaseHistory__blocks">
				{
					loading
						? renderCardPlaceholder
						: renderDependingOnLoadingErrorState
				}
			</div>
		</div>
	);
}


export default PurchasePanel;

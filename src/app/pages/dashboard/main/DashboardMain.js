import Info from "./info/Info";
import ProductList from "./product-list/ProductList";
import PurchasePanel from "./purchase/PurchasePanel";
import SubscriptionPanel from "./subscription/SubscriptionPanel";

function DashboardMain(props) {
	return (
		<div className="dashboardMain">
			<div className="container">
				<div className="dashboardMain__wrap">
					<Info/>
					<ProductList/>
					<div style={{
						display: 'grid',
						gap: '24px',
						gridTemplateColumns: 'repeat(2, 1fr)',
						marginBottom: '80px'
					}}>
						<PurchasePanel/>
						<SubscriptionPanel/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardMain;

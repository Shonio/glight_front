import {useEffect} from "react";
import EmptyCart from "./empty-cart/EmptyCart";
import ProductGrid from "./product-grid/ProductGrid";
import ProductSummary from "./product-summary/ProductSummary";
import PaymentInfo from "./payment-info/PaymentInfo";
import {useSelector} from "react-redux";
import {selectProducts} from "../../../store/cartSlice";

function Cart(props) {
    let products = useSelector(selectProducts);

    useEffect(() => {
        const tmp = [];
        for (let i = 0; i < 4; i++) {
            const product = {
                id: i,
                name: `Product ${i}`,
                amountOfEnergy: Math.floor(Math.random() * 1000),
                priceForUnit: Math.floor(Math.random() * 1000),
                price: Math.floor(Math.random() * 1000),
                // 0 - buy once, 1 - buy every month
                buyType: Math.floor(Math.random() * 2),
            };

            tmp.push(product);
        }

        // setProducts(tmp);
    }, []);

    return (
			<div className="cart">
				<div className="container">
					{
						products.length === 0 ?

						<EmptyCart/> :

						<>
						<div className="cart__wrap">
							<ProductGrid products={products}/>

							<div>
									<ProductSummary products={products}/>
									<PaymentInfo/>
							</div>
						</div>
						</>
					}

				</div>
			</div>
    );
}

export default Cart;

import * as React from 'react';
import './product-grid.css';
import ProductItem from "./product-item/ProductItem";

function ProductGrid({products}) {
    return (
        <div className='productGrid'>
          <h4 className="dashboardMain__title" style={{marginBottom: '24px'}}>Корзина</h4>
					{products.map((product) => (
							<ProductItem key={product.cartItemId} item={product}/>
					))}
        </div>
    );
}

export default ProductGrid;


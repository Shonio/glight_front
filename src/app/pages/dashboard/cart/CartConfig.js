import {authRoles} from "../../../auth";
import Cart from "./Cart";

const CartConfig = {
    settings: {
        layout: {
            style: 'layoutMain',
            config: {},
        },
    },
    auth: authRoles.admin,
    routes: [
        {
            path: '/user/cart',
            element: <Cart/>,
        },
    ],
};

export default CartConfig;
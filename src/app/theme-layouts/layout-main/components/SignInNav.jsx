import { Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../utils/customButton";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../store/cartSlice";

const SignInNav = () => {

	const [total, setTotal] = useState('0,00')
	let products = useSelector(selectProducts);

	useEffect(() => {
		const total = products.reduce(( acc, prod) => acc + prod.totalPrice, 0)
		setTotal(total)
	}, [products]);



	return (
		<div className="signIn-nav">
			<CustomButton
				sx={{
					background: "rgba(0, 171, 85, 0.16)",
					textTransform: "capitalize",
					"&:hover": {
						backgroundColor: "rgba(0, 171, 85, 0.16)",
					},
				}}
			>
				<Link className={`signIn_link`} to="/user/cart">
					Корзина
				</Link>
			</CustomButton>

			<Typography
				sx={{
					fontWeight: 700,
					lineHeight: "24px",
					color: "#00AB55",
					padding: "6px 16px",
					border: "1px solid rgba(0, 171, 85, 0.48)",
					borderRadius: "8px",
					margin: "0 12px",
				}}
			>
				{total} ₸
			</Typography>

			<AccountMenu />
		</div>
	);
};

export default SignInNav;

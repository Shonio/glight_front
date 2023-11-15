import * as React from "react";
import { useEffect, useState } from "react";
import "./modal-product-detail.css";
import { Box, IconButton, Typography } from "@mui/material";
import { CssTextField } from "../../../../utils/customCssTextField";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductToCart,
	selectRemainingAvailablePower,
	updateProduct,
} from "../../../../store/cartSlice";
import { formButton, modalBox, modalProductPrice, modalProductTitle, modalTotalPrice } from "../../../../store/customModalStyle";

const schema = yup.object().shape({
  energy: yup
    .number()
    .typeError("Введите число")
    .min(1, "Введите число больше 0")
    .required("Введите количество энергии"),
	useRadioGroup: yup.string(),
});

function ModalProductDetail({ product, closed, mode }) {
	// ------------------
	const dispatch = useDispatch();
	const remainingAvailablePower = useSelector(selectRemainingAvailablePower);
	// ----------------------------------------------

	const [power, setPower] = useState(0);
	const [selected, setSelected] = useState("ONCE");
	const [totalPrice, setTotalPrice] = useState(0);
	// ----------------------------------------------


	// ----------------------------------------------
	const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (power < 0 ) setPower(1)

		setTotalPrice(power * product.price);
	}, [power]);

	//-----------------------------------------

	function handleFormSubmit(data) {
		console.log(data);

		const payLoad = {
			...product,
			totalPrice: totalPrice,
			amountOfEnergy: power,
			buyType: data.buyType,
		};

		mode === "add"
			? dispatch(addProductToCart(payLoad))
			: dispatch(updateProduct(payLoad));

		closed();
	}

	// ----------------------------------------------

	const getInputClass = (value) => {
    return selected === value ? "selected" : "";
  };

	return (
		<Box sx={modalBox}>
			<Box sx={{textAlign: "right",}}>
				<IconButton aria-label="close" onClick={closed}>
					<CloseIcon
						sx={{
							color: "#637381",
						}}
					/>
				</IconButton>
			</Box>

			<Box sx={{p: 3,}}>
				<div className="productMainCard__row productMainCard__line">
					<Typography sx={modalProductTitle}>
						{product.title}
					</Typography>

					<Typography sx={modalProductPrice}>
						{product.price} ₸/кВт*ч
					</Typography>
				</div>

				<div className="productMainCard__row productMainCard__line">
					<div className="productMainCard__col">
						<Typography
							sx={{
								color: "#637381",
							}}
						>
							Местоположение
						</Typography>
						<Typography
							sx={{
								color: "#212B36",
							}}
						>
							{product.location}
						</Typography>
					</div>

					<div className="productMainCard__col">
						<Typography
							sx={{
								color: "#637381",
							}}
						>
							Мощность станции
						</Typography>
						<Typography
							sx={{
								color: "#212B36",
							}}
						>
							{product.powerStation} МВт
						</Typography>
					</div>

					<div className="productMainCard__col">
						<Typography
							sx={{
								color: "#637381",
							}}
						>
							Доступная энергия
						</Typography>
						<Typography
							sx={{
								color: "#212B36",
							}}
						>
							{product.availablePower} МВт
						</Typography>
					</div>
				</div>

				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<div className="form__wrap">
						<div className="modalForm__row">
							<Typography>Кол-во энергии</Typography>
							<Typography
								sx={{
									fontSize: "12px",
									lineHeight: "18px",
									color: "#637381",
								}}
							>
								Вам доступно:{" "}
								<span style={{ textDecoration: "underline" }}>
									{remainingAvailablePower} кВт*ч
								</span>
							</Typography>
						</div>

						<Controller
							name="energy"
							control={control}
							render={({ field }) => {
								return (
									<CssTextField
										{...field}
										type="number"
										onChange={(e) => {
											setPower(e.target.value);
											field.onChange(e.target.value);
										}}
										inputValue={power}
										sx={{ marginBottom: "32px" }}
										error={!!errors.energy}
										helperText={errors?.energy?.message}
									/>
								);
							}}
						/>

						<Typography
							sx={{
								display: "flex",
								alignItems: "center",
								marginBottom: "12px",
							}}
						>
							Покупка энергии
							<InfoTwoToneIcon
								sx={{
									marginLeft: "5px",
								}}
							/>
						</Typography>

						<Controller
							name="buyType"
							control={control}
							defaultValue="ONCE"
							rules={{ required: "Выберите тип покупки" }}
							render={({ field }) => (
								<div className="radioGroup">
									<label className={`label ${getInputClass('ONCE')}`}>
										<input
											type="radio"
											value="ONCE"
											checked={selected === "ONCE"}
											onChange={(e) => {
												setSelected(e.target.value);
												field.onChange(e.target.value);
											}}
										/>
										Разово
									</label>
									<label className={` label ${getInputClass('MONTHLY')}`}>
										<input
											type="radio"
											value="MONTHLY"
											checked={selected === "MONTHLY"}
											onChange={(e) => {
												setSelected(e.target.value);
												field.onChange(e.target.value);
											}}
										/>
										Ежемесячно
									</label>
									{errors.buyType && <span>{errors.buyType.message}</span>}
								</div>
							)}
						/>

					

						<div className="modalForm__row">
							<Typography sx={modalTotalPrice}>
								Стоимость
							</Typography>
							<Typography sx={modalTotalPrice}>
								{totalPrice}₸
							</Typography>
						</div>

						<button
							style={formButton}
						>
							{mode === "add" ? "Добавить в корзину" : "Обновить позицию"}
						</button>
					</div>
				</form>
			</Box>
		</Box>
	);
}

export default ModalProductDetail;

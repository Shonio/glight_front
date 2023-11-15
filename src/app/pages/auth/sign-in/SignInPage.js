import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "../../../../@lodash";
import { useEffect } from "react";
import jwtService from "../../../auth/services/jwtService";
import "./sign-in.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CssTextField } from "../../../utils/customCssTextField";
import { CustomButton } from "../../../utils/customButton";
import InputMask from "react-input-mask";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	phone: yup.string().required("Please enter your phone number."),
	// .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Invalid phone number.'),
	password: yup
		.string()
		.required("Please enter your password.")
		.min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
	phone: "",
	password: "",
	remember: true,
};

function SignInPage() {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const { control, formState, handleSubmit, setError, setValue } = useForm({
		mode: "onChange",
		defaultValues,
		resolver: yupResolver(schema),
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		setValue("phone", "+77014511844", {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue("password", "admin", { shouldDirty: true, shouldValidate: true });
	}, [setValue]);

	function onSubmit({ phone, password }) {
		let cleanPhoneNum = phone.replace(/\D/g, "");
		jwtService
			.signInWithPhoneAndPassword(cleanPhoneNum, password)
			.then((user) => {
				// No need to do anything, user data will be set at app/auth/AuthContext
			})
			.catch((_errors) => {
				console.log(_errors);
				setError("server", {
					type: "server",
					message: _errors,
				});
				// _errors.forEach((error) => {
				//     setError(error.type, {
				//         type: 'manual',
				//         message: error.message,
				//     });
				// });
			});
	}

	return (
		<div className="signIn">
			<div className="container">
				<div className="sighIn__wrap">
					<Typography
						variant="h3"
						sx={{
							fontWeight: 700,
							fontSize: "32px",
							lineHeight: "48px",
							color: "#212B36",
							marginBottom: "10px",
						}}
					>
						Вход в личный кабинет
					</Typography>

					<div className="server-error">
						{errors.server && <p>{errors.server.message}</p>}
					</div>
					<form
						name="loginForm"
						noValidate
						className="flex flex-col justify-center w-full mt-32"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Controller
							name="phone"
							control={control}
							rules={{
								pattern: {
									value: /^[+]{0,1}[0-9 ]+$/,
									message: "Invalid phone number format",
								},
								required: "This field is required",
							}}
							render={({ field: { onChange, value } }) => (
								<InputMask
									mask="+7 (999) 999 99 99"
									value={value}
									onChange={onChange}
								>
									{(inputProps) => (
										<CssTextField
											{...inputProps}
											label="Номер телефона"
											autoFocus
											type="tel"
											error={!!errors.phone}
											helperText={errors?.phone?.message}
											variant="outlined"
											required
											fullWidth
										/>
									)}
								</InputMask>
							)}
						/>

						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<CssTextField
									{...field}
									sx={{
										marginBottom: "32px",
									}}
									id="outlined-adornment-password"
									label="Пароль"
									type={showPassword ? "text" : "password"}
									error={!!errors.password}
									helperText={errors?.password?.message}
									variant="outlined"
									required
									fullWidth
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							)}
						/>

						<div className="form__rememberMe">
							<Controller
								name="remember"
								control={control}
								render={({ field }) => (
									<FormControl>
										<FormControlLabel
											label="Запомнить меня"
											control={
												<Checkbox
													size="small"
													{...field}
													style={{ color: "#00AB55" }}
												/>
											}
										/>
									</FormControl>
								)}
							/>

							{/* <Link className="form__forgot" to="/pages/auth/forgot-password">
                                Забыли пароль?
                            </Link> */}
						</div>

						<CustomButton
							variant="contained"
							aria-label="Sign in"
							disabled={_.isEmpty(dirtyFields) || !isValid}
							type="submit"
							size="large"
							sx={{
								fontSize: "15px",
								lineHeight: "26px",
								color: "#FFFFFF",
								background: "#00AB55",
								width: "100%",
								textTransform: "capitalize",
								padding: "11px 0",
								"&:hover": {
									backgroundColor: "#00AB55",
								},
							}}
						>
							Войти
						</CustomButton>
					</form>

					<div className="signUp__wrap">
						<Typography
							sx={{
								marginRight: "6px",
								fontSize: "16px",
								lineHeight: "24px",
								color: "#212B36",
							}}
						>
							Нет аккаунта?
						</Typography>
						<Link className="link_register" to="/sign-up">
							Зарегистрироваться
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignInPage;

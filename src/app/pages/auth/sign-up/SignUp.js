import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {step1Schema, step2Schema, step3Schema} from "./validationSchemas";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

import "./sign-up.css";
import jwtService from "../../../auth/services/jwtService";

const SignUp = () => {
    const [step, setStep] = useState(1);
    const resolver = step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema;
    const {
        handleSubmit, control, setError, clearErrors, formState: {errors},
    } = useForm({
        mode: 'onBlur', resolver: yupResolver(resolver), defaultValues: {
            userAgreement: false,
        },
    });


    const onSubmit = ({phone, password, name, location, accountNumber, email, news}) => {
        if (step === 3) {
            // Remove mask from phone number and account number
            phone = phone.replace(/\D/g, "");
            accountNumber = accountNumber.replace(/\D/g, "");
            const data = {
                phone, password, name, location, accountNumber, email, news,
            }
            console.log(JSON.stringify(data, null, 2));

            // Make call to jwtService and create user with data
            jwtService.createUser(data)
                .then((user) => {
                    clearErrors('server');
                    console.log("User created:", user);
                })
                .catch((_error) => {
                    console.log("Error:", _error);
                    setError('server', {
                        type: 'server', message: _error,
                    });
                });
        } else {
            console.log("current step:", step);
            setStep((prevStep) => prevStep + 1);
        }
    };

    const goBack = () => {
        if (step > 1) setStep((prevStep) => prevStep - 1);
    };

    function mockCreateUser() {
        console.log("mockCreateUser");
        const data = {
            phone: "77014511844",
            password: "159951",
            name: "dev",
            location: "Location 1",
            accountNumber: "111111111",
            email: "great_alexe83g@mail.ru",
            news: true,
        }
        jwtService.createUser(data)
            .then((user) => {
                clearErrors('server');
                console.log("User created:", user);
            })
            .catch((_error) => {
                console.log("Error:", _error);
                setError('server', {
                    type: 'server', message: _error,
                });
            });
    }

    return (<div className="signUp">
        <Typography
            variant="h3"
            sx={{
                fontWeight: 700, fontSize: "32px", lineHeight: "48px", color: "#212B36", marginBottom: "10px",
            }}
        >
            Регистрация
        </Typography>


				<div className="server-error">
        	{errors.server && (<p>{errors.server.message}</p>)}
				</div>

        <div className="sighUp__subtitle">
            <Typography
                sx={{
                    fontSize: "16px", lineHeight: "24px", color: "#212B36",
                }}
            >
                {step === 1 && "Данные для входа"}
                {step === 2 && "Личные данные"}
                {step === 3 && "Контактные данные"}
            </Typography>

            <Typography sx={{color: "#637381"}}>Шаг {step} из 3</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && <Step1 control={control} errors={errors}/>}
            {step === 2 && <Step2 control={control} errors={errors}/>}
            {step === 3 && <Step3 control={control} errors={errors}/>}

            <div className="btnWrap">
                {step > 1 && (<button
                    className={'btnBack'}
                    type="button" onClick={goBack}>
                    Назад
                </button>)}
                <button
                    className={'btnNext'}
                    type="submit">{step === 3 ? 'Зарегистрироваться' : 'Далее'}
                </button>
            </div>
        </form>

        {step === 1 && (<div className="signUp__wrap">
            <Typography
                sx={{
                    marginRight: "6px", fontSize: "16px", lineHeight: "24px", color: "#212B36",
                }}
            >
                Уже есть аккаунт?
            </Typography>
            <Link className="link_register" to="/sign-in">
                Войти
            </Link>
        </div>)}
    </div>);
};

export default SignUp;


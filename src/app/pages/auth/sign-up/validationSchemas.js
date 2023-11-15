import * as yup from 'yup';

export const step1Schema = yup.object().shape({
    phone: yup.string().required('Обязательное поле'),
    password: yup.string().min(6, 'Минимум 6 знаков').required('Обязательное поле'),
    passwordCheck: yup.string().min(6, 'Минимум 6 знаков').oneOf([yup.ref('password'), null], 'Пароли не совпадают. Попробуйте еще раз')
});

export const step2Schema = yup.object().shape({
    name: yup.string().required('Обязательное поле'),
    location: yup.string().required('Обязательное поле'),
    accountNumber: yup
        .string()
        .required('Обязательное поле')
        .matches(/^\d{3}\s\d{3}\s\d{3}$/, 'Неверный формат'),
});

export const step3Schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Обязательное поле'),
    news: yup.boolean(),
    userAgreement: yup.boolean().oneOf([true], 'Необходимо принять пользовательское соглашение')
});
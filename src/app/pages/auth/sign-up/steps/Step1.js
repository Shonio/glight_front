import React from 'react';
import {Box, FormControl, IconButton, InputAdornment} from '@mui/material';
import {Controller} from 'react-hook-form';
import {CssTextField} from '../../../../utils/customCssTextField';
import ReactInputMask from 'react-input-mask';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Step1 = ({control, errors}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordCheck = () => setShowPasswordCheck((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (<Box>
            <FormControl fullWidth>
                <Controller
                    name="phone"
                    control={control}
                    rules={{required: 'Phone number is required'}}
                    render={({field: {onChange, value}}) => (
                        <ReactInputMask mask="+7 (999) 999 99 99" value={value} onChange={onChange}>
                            {inputProps => (<CssTextField
                                    {...inputProps}
                                    label="Номер телефона"
                                    autoFocus
                                    type="tel"
                                    error={Boolean(errors.phone)}
                                    helperText={errors?.phone?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />)}
                        </ReactInputMask>)}
                />
            </FormControl>

            <FormControl fullWidth>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Password is required', minLength: {
                            value: 6, message: 'Password must be at least 6 characters',
                        },
                    }}
                    render={({field}) => (<CssTextField
                            {...field}
                            sx={{marginBottom: '32px'}}
                            id="outlined-adornment-password"
                            label="Пароль"
                            type={showPassword ? 'text' : 'password'}
                            error={Boolean(errors.password)}
                            helperText={errors?.password?.message}
                            variant="outlined"
                            required
                            fullWidth
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>),
                            }}
                        />)}
                />
            </FormControl>

            <FormControl fullWidth>
                <Controller
                    name="passwordCheck"
                    control={control}
                    rules={{
                        required: 'Password confirmation is required', minLength: {
                            value: 6, message: 'Password confirmation must be at least 6 characters',
                        }, validate: (value) => value === control.getValues().password || 'Passwords do not match',
                    }}
                    render={({field}) => (<CssTextField
                            {...field}
                            sx={{
                                marginBottom: '32px',
                            }}
                            id="outlined-adornment-passwordCheck"
                            label="Подтверждение пароля"
                            type={showPasswordCheck ? 'text' : 'password'}
                            error={Boolean(errors.passwordCheck)}
                            helperText={errors?.passwordCheck?.message}
                            variant="outlined"
                            required
                            fullWidth
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle passwordCheck visibility"
                                            onClick={handleClickShowPasswordCheck}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPasswordCheck ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>),
                            }}
                        />)}
                />
            </FormControl>
        </Box>);
};

export default Step1;


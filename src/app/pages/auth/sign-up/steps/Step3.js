import React from 'react';
import { Controller } from 'react-hook-form';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    TextField,
} from '@mui/material';

const Step3 = ({ control, errors }) => {
    return (
        <Box>
            <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        label="E-mail"
                        fullWidth
                    />
                )}
            />
            <FormControl>
                <FormControlLabel
                    control={
                        <Controller
                            control={control}
                            name="news"
                            render={({ field }) => (
                                <Checkbox {...field} style={{ color: '#00AB55' }} />
                            )}
                        />
                    }
                    label="Я хочу получать новости и уведомления по электронной почте"
                />
                <FormControlLabel
                    control={
                        <Controller
                            control={control}
                            name="userAgreement"
                            render={({ field }) => (
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    style={{ color: '#00AB55' }}
                                />
                            )}
                        />
                    }
                    label="Я принимаю условия пользовательского соглашения"
                    error={!!errors.userAgreement}
                />
                {errors.userAgreement && (
                    <FormHelperText error>{errors.userAgreement.message}</FormHelperText>
                )}
            </FormControl>
        </Box>
    );
};

export default Step3;

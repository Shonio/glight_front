import React, {useEffect, useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {Controller} from 'react-hook-form';
import {CssTextField} from '../../../../utils/customCssTextField';
import InputMask from 'react-input-mask';

const Step2 = ({control, errors}) => {
    const [locationData, setLocationData] = useState([]);

    useEffect(() => {
        setLocationData([{id: 1, name: 'Location 1'}, {id: 2, name: 'Location 2'},]);
    }, []);

    return (<Box>
            <FormControl fullWidth>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({field}) => (<CssTextField
                            label="Имя и Фамилия"
                            type="text"
                            required
                            helperText={errors?.name?.message}
                            error={Boolean(errors.name)}
                            {...field}
                        />)}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="location-label">Населенный пункт</InputLabel>
                <Controller
                    control={control}
                    defaultValue=""
                    name="location"
                    render={({field}) => (<Select
                            sx={{
                                marginBottom: '20px', background: 'rgba(145, 158, 171, 0.08)',
                            }}
                            labelId="location-label"
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(errors.location)}
                        >
                            {locationData.map((item) => (<MenuItem key={item.id} value={item.name}>
                                    {item.name}
                                </MenuItem>))}
                        </Select>)}
                />
            </FormControl>

            <FormControl fullWidth>
                <Controller
                    name="accountNumber"
                    control={control}
                    defaultValue=""
                    render={({field: {onChange, value}}) => (
                        <InputMask mask="999 999 999" value={value} onChange={onChange}>
                            {inputProps => (<CssTextField
                                    {...inputProps}
                                    label="Номер лицевого счета"
                                    autoFocus
                                    type="text"
                                    error={Boolean(errors.accountNumber)}
                                    helperText={errors?.accountNumber?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />)}
                        </InputMask>)}
                />
            </FormControl>
        </Box>);
};

export default Step2;

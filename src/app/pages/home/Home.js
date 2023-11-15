import {Typography} from '@mui/material';
import React from 'react';
import {CustomButton} from '../../utils/customButton';
import './Home.css'
import {Link} from "react-router-dom";


function Home(props) {
    return (
        <div className="home">
            <div className="container">
                <div className="home__wrap">
                    <div className="home__promo">

                        <div className="home__info">
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '40px',
                                    lineHeight: '56px',
                                    color: '#007B55',
                                }}
                            >
                                Покупай «зеленую» энергию и помогай окружающей среде
                            </Typography>

                            <div className="home__subtitle">
                                <div>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '32px',
                                            lineHeight: '48px',
                                            color: '#FFAB00',
                                        }}
                                    >1000+</Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#212B36',
                                        }}
                                    >человек уже пользуются «зеленой» энергией</Typography>
                                </div>

                                <div>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '32px',
                                            lineHeight: '48px',
                                            color: '#FFAB00',
                                        }}
                                    >12000+</Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#212B36',
                                        }}
                                    >кВт*ч «зеленой» энергии было куплено за последний месяц</Typography>
                                </div>
                            </div>
                        </div>

                        <img src={'assets/images/promo-img.png'} alt="promo img"/>
                    </div>

                    <Link className={`signIn_link`} to="/sign-in">
                        <CustomButton
                            sx={{
                                color: '#FFFFFF',
                                background: '#00AB55',
                                width: '100%',
                                padding: '17px 0',
                                textTransform: 'capitalize',
                                fontSize: '15px',
                                lineHeight: '26px',
                                '&:hover': {
                                    backgroundColor: '#00AB55'
                                },
                            }}
                        >
                            Присоединиться
                        </CustomButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;

import React, {memo} from "react";
import SignInNav from "./SignInNav";
import {CustomButton} from "../../../utils/customButton";
import {Link} from "react-router-dom";

function NavbarLayout({isUserAuthenticated}) {

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrap">

                    <div className="logo">
                        <Link className={`signIn_link`} to="/">
                            <img src='assets/images/logo/logo-name.svg' alt="logo name"/>
                        </Link>
                    </div>

                    {isUserAuthenticated ?
                        (<SignInNav/>) :
                        (<Link className={`signIn_link`} to="/sign-in">
                            <CustomButton sx={{
                                color: '#FFFFFF',
                                background: '#00AB55',
                                textTransform: 'capitalize',
                                textDecoration: 'none',
                                fontSize: '14px',
                                '&:hover': {
                                    backgroundColor: '#00AB55'
                                },
                            }}
                            >Войти</CustomButton>
                        </Link>)
                    }

                </div>
            </div>
        </header>
    );
}

export default memo(NavbarLayout);
import {memo} from 'react';

function FuseSplashScreen() {
    return (
        <div id="fuse-splash-screen">
            <div className="logo">
                <img width="128" src="assets/images/logo/logo.svg" alt="logo"/>
            </div>
            <div id={'spinner'}>
                <div className="bounce1"/>
                <div className="bounce2"/>
                <div className="bounce3"/>
            </div>
        </div>
    );
}

export default memo(FuseSplashScreen);

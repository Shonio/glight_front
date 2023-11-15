import {memo, useContext} from 'react';
import {useRoutes} from 'react-router-dom';
import AppContext from "../../AppContext";
import {useSelector} from "react-redux";
import {selectFuseCurrentLayoutConfig} from "../../store/settingsSlice";
import {selectUser} from "../../store/userSlice";
import FooterLayout from "./components/FooterLayout";
import NavbarLayout from "./components/NavbarLayout";
import { ThemeProvider } from '@mui/material/styles';
import { customFontFamily } from '../../utils/customFontFamily';
import SignInHeader from '../../pages/auth/sign-in/sign-in-header/SignInHeader';


function LayoutMain(props) {
		const user = useSelector(selectUser);

		const config = useSelector(selectFuseCurrentLayoutConfig);
		const appContext = useContext(AppContext);
		const {routes} = appContext;

		return (
			<ThemeProvider theme={customFontFamily}>
				<div className='wrapper'>
					{
						config.navbar.isLoginForm 
						?
						<SignInHeader/>
						:
						(config.navbar.show && (<NavbarLayout isUserAuthenticated={user.role.length > 0}/>))
					}

					{/*<h1>USER:</h1>
					<pre>{JSON.stringify(user, null, 2)}</pre>*/}

					{useRoutes(routes)}
					{config.footer && (<FooterLayout />)}
				</div>
			</ThemeProvider>
		);	
}

export default memo(LayoutMain);

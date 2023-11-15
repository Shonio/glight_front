import './styles/globals.css'
import '../@mock-api';
import withAppProviders from "./withAppProviders";
import BrowserRouter from "../@fuse/core/BrowserRouter";
import FuseLayout from "../@fuse/core/FuseLayout";
import themeLayouts from "./theme-layouts/themeLayouts";
import {AuthProvider} from "./auth/AuthContext";
import {useSelector} from "react-redux";
import {selectUser} from "./store/userSlice";
import settingsConfig from "./configs/settingsConfig";
import FuseAuthorization from "../@fuse/core/FuseAuthorization";

function App() {
    const user = useSelector(selectUser);

    return (
			<AuthProvider>
					<BrowserRouter>
							<FuseAuthorization
									userRole={user.role}
									loginRedirectUrl={settingsConfig.loginRedirectUrl}
							>
									<FuseLayout layouts={themeLayouts}/>
							</FuseAuthorization>
					</BrowserRouter>
			</AuthProvider>
    );
}

export default withAppProviders(App)();

import {authRoles} from "../../../auth";
import DashboardMain from "./DashboardMain";

const DashboardMainConfig = {
    settings: {
        layout: {
            style: 'layoutMain',
            config: {},
        },
    },
    auth: authRoles.admin,
    routes: [
        {
            path: '/user/dashboard',
            element: <DashboardMain/>,
        },
    ],
};

export default DashboardMainConfig;
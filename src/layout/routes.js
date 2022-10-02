// Icons
import {
    Home,
    QuestionMark,
    Article,
    Devices,
    Call,
    
    // Auth
    Login,
    Logout,
    Settings,
    
    // Socials
    GitHub,
    LinkedIn,
    Telegram,
    Twitter,
} from '@mui/icons-material';

import { useAuthUpdate } from 'contexts/exports';
import { useAuthData } from 'hooks/exports';


const routes1 = [
    {
        name: "Home",
        path: "/",
        icon: <Home />
    },
    {
        name: "Projects",
        path: "projects",
        icon: <Devices />
    },
    {
        name: "Articles",
        path: "articles",
        icon: <Article />
    },
]

const routes3 = [
    {
        name: "About",
        path: "about",
        icon: <QuestionMark />
    },
    // {
    //     name: "Policies",
    //     path: "policies",
    //     icon: <Feed />
    // },
    {
        name: "Contact",
        path: "contact",
        icon: <Call />
    },
    {
        name: "Github",
        path: "https://github.com/shaun-ps-04",
        externalPath: true,
        icon: <GitHub />
    },
    {
        name: "LinkedIn",
        path: "https://www.linkedin.com/in/sean-stocker-404149226",
        externalPath: true,
        icon: <LinkedIn />
    },
    {
        name: "Telegram",
        path: "https://t.me/shaunscodehaven",
        externalPath: true,
        icon: <Telegram />
    },
    {
        name: "Twitter",
        path: "policies",
        externalPath: true,
        icon: <Twitter />
    },
]

const useRoutes = () => {

    const authUpdate = useAuthUpdate();
    const { isLoggedIn } = useAuthData();

    let routes2 = []

    if (isLoggedIn) {
        routes2.push(
            {
                name: "Settings",
                path: "settings",
                icon: <Settings />,
            },
            {
                name: "Logout",
                path: "logout",
                icon: <Logout />,
                func: () => authUpdate("clear")
            })
        } 
    else {
        routes2.push(
            {
                name: "Admin Login",
                path: "login",
                icon: <Login />
            },
            // {
            //     name: "Signup",
            //     path: "signup",
            //     icon: <PersonAdd />
            // }
        )
    }
     
    return [routes1, routes2, routes3];
}

export default useRoutes;
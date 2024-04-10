import { Navigate } from "react-router-dom";
import CalanderPage from "../components/CalanderPage";
import Home from "../components/Home"
import LoginPage from "../components/LoginPage";
import Notes from "../components/Notes";
import SignUp from "../components/SignUp";

const Approutes = [
    {
        path : '/',
        element : <Home/>
    },
    {
        path : '/calander',
        element : <CalanderPage/>
    },
    {
        path : '/notes/:date',
        element : <Notes/>
    },
    {
        path : '/notes',
        element : <Notes/>
    },
    {
        path : '/login',
        element : <LoginPage/>
    },
    {
        path : '/signup',
        element : <SignUp/>
    },
    {
        path : '*',
        element : <Navigate to= '/' />
    }
]

export default Approutes
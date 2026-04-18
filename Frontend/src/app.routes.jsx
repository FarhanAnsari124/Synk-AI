import { createBrowserRouter } from "react-router";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/homepage",
        element: <Homepage />
    }
])
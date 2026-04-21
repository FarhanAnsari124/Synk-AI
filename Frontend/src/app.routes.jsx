import { createBrowserRouter } from "react-router";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/homepage",
        element: <Protected><Homepage /></Protected>
    }
])
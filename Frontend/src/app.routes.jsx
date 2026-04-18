import { createBrowserRouter } from "react-router";

import Home from "./pages/Homepage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
])
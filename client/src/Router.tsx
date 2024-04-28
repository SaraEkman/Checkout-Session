import App from "./App"
import Confirmation from "./components/Confirmation"
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        action: async () => {
        return <App />
        }
    },
    {
        path: "/confirmation",
        action: async () => {
        return <Confirmation />
        }
    }
])
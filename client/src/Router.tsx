import App from "./App";
import Confirmation from "./components/Confirmation";
import { createBrowserRouter } from "react-router-dom";
import Payment from "./components/Payment";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <App />,
        index: true
      },
      {
        path: "/Payment",
        element: <Payment />
      },
      {
        path: "/confirmation",
        element: <Confirmation />
      }
    ]
  }
]);

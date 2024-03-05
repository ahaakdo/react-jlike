//路由配置
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import Account from "@/pages/Account";
import Addaccount from "@/pages/Addaccount";
import Year from "@/pages/Year";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'article',
        element: <Article />
      },
      {
        path: 'publish',
        element: <Publish />
      },
      {
        path: 'account',
        element: <Account />
      },
      {
        path: 'add',
        element: <Addaccount />
      },
      {
        path: 'year',
        element: <Year />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
//路由配置
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
// import Home from "@/pages/Home";
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";
// import Account from "@/pages/Account";
// import Addaccount from "@/pages/Addaccount";
// import Year from "@/pages/Year";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("@/pages/Home"))
const Article = lazy(() => import("@/pages/Article"))
const Publish = lazy(() => import("@/pages/Publish"))
const Account = lazy(() => import("@/pages/Account"))
const Addaccount = lazy(() => import("@/pages/Addaccount"))
const Year = lazy(() => import("@/pages/Year"))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <Suspense fallback={'加载中'}><Home /></Suspense>
      },
      {
        path: 'article',
        element: <Suspense fallback={'加载中'}><Article /></Suspense>
      },
      {
        path: 'publish',
        element: <Suspense fallback={'加载中'}><Publish /></Suspense>
      },
      {
        path: 'account',
        element: <Suspense fallback={'加载中'}><Account /></Suspense>
      },
      {
        path: 'add',
        element: <Suspense fallback={'加载中'}> <Addaccount /></Suspense>
      },
      {
        path: 'year',
        element: <Suspense fallback={'加载中'}><Year /></Suspense>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
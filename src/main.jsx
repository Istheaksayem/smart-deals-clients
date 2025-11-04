import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout.jsx';

import AllProducts from './comlponent/AllProducts/AllProducts.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import Login from './comlponent/Login/Login.jsx';
import Register from './comlponent/Register/Register.jsx';
import MyProducts from './comlponent/MyProducts/MyProducts.jsx';
import MyBids from './comlponent/MyBids/MyBids.jsx';
import PrivateRoute from './comlponent/PrivateRoute/PrivateRoute.jsx';
import Home from './comlponent/Home/Home.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'allProducts',
        Component: AllProducts
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: 'myProducts',
        element: <PrivateRoute>.
          <MyProducts></MyProducts>
        </PrivateRoute>
      },
      {
        path: 'myBids',
        element: <PrivateRoute>
          <MyBids></MyBids>
        </PrivateRoute>
      },
    ]

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>,
)

import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import GuestLayout from '../components/GuestLayout';
import Calculator from '../pages/Calculator/Calculator';
import Login from '../pages/Login/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="calculator" />,
      },
      {
        path: 'calculator',
        element: <Calculator />,
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="login" />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

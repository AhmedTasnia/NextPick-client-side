import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../pages/Root/Root';
import Register from '../Components/Register/Register';
import SignUp from '../Components/SignUp/Login';
import Login from '../Components/SignUp/Login';



export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children: [
      {
        index: true,
        path: "/",
      },
     
    ]
  },
    {
    path: "/auth/register",
    Component: Register,
  },
  {
    path: "/auth/login",
    Component: Login,
  },

  
]);

  

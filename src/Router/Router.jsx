import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../pages/Root/Root';
import Register from '../Components/Register/Register';
import SignUp from '../Components/SignUp/Login';
import Login from '../Components/SignUp/Login';
import MyQueries from '../Components/MyQueries/MyQueries';
import AddQueries from '../Components/AddQueries/AddQueries';
import AllQueries from '../Components/AllQueries/AllQueries';
import QueryDetails from '../Components/QueriesDetails/QueryDetails';
import MyRecommandation from '../Components/MyRecommendation/MyRecommendation';
import RecommendationsForMe from '../Components/RecomandationForMe/RecomandationsForMe';



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
   {
    path: "/MyQueries",
    Component: MyQueries,
  },
  {
    path: "/AddQueries",
    Component: AddQueries,
  },
  {
    path: "/AllQueries",
    loader: () => fetch('https://next-pick-server.vercel.app/AddQueries'),
    Component: AllQueries,
  },
  {
    path: "/query-details/:id",
    Component: QueryDetails,
  },
  {
    path: "/MyRecommendations",
    Component: MyRecommandation,
  },
   {
    path: "/RecommendationsForMe",
    Component: RecommendationsForMe,
  },

  
]);

  

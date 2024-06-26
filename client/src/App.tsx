import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppSelector } from './hooks/reduxHooks';
import BasicLayout from './components/layouts/BasicLayout';
import PrivateRouter from './components/HOCs/PrivateRouter';
import SignUpPage from './components/pages/SignUpPage';
import BannerPage from './components/pages/BannerPage';
import AnalysisPage from './components/pages/AnalysisPage';
import ExpIncPage from './components/pages/ExpIncPage';

function App(): JSX.Element {
  const user = useAppSelector((state) => state.auth.userData);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <BasicLayout />,
      children: [
        {
          element: <PrivateRouter isAllowed={user.status !== 'logged'} redirect="/analysis" />,
          children: [
            { path: '/signin', element: <BannerPage /> },
            { path: '/signup', element: <SignUpPage /> },
          ],
        },
        {
          element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/signin" />,
          children: [
            { path: '/analysis', element: <AnalysisPage /> },
            { path: '/expinc', element: <ExpIncPage /> },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

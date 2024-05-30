import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type PrivateRouterPropsType = {
  children?: React.ReactElement;
  isAllowed: boolean;
  redirect?: string;
};

export default function PrivateRouter({
  children,
  isAllowed,
  redirect = '/',
}: PrivateRouterPropsType): JSX.Element {
  console.log(isAllowed)
  if (!isAllowed) return <Navigate to={redirect} />;
  return children || <Outlet />;
}

import { Container, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import type { AxiosError } from 'axios';
import NavBar from '../ui/NavBar';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { refreshThunk } from '../../redux/slices/authThunkActions';
import SpinnerPage from '../HOCs/SpinnerPage';
import Notify from '../ui/Notify';

export default function BasicLayout(): JSX.Element {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.userData);
  useEffect(() => {
    void dispatch(refreshThunk())
      // .unwrap()
      // .catch((err: AxiosError) => {
      //   console.log(err.code);
      //   if (err.code === 'ERR_NETWORK') {
      //     toast({
      //       title: 'Server connection problem.',
      //       status: 'error',
      //       duration: 9000,
      //       isClosable: true,
      //     });
      //   }
      // });
  }, []);

  return (
    <Container maxW="container.xl">
      {user.status === 'fetching' ? (
        <SpinnerPage />
      ) : (
        <>
          {user.status !== 'guest' && <NavBar />}
          <Outlet />
        </>
      )}
    </Container>
  );
}

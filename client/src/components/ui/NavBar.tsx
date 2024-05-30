import React from 'react';

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logoutThunk } from '../../redux/slices/authThunkActions';

export default function NavBar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAppSelector((state) => state.auth.userData);
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    void dispatch(logoutThunk());
  };
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} boxShadow="dark-lg">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box>Logo</Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/">Home</NavLink>
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <HStack spacing={8} alignItems="center">
            {user.status === 'logged' ? (
              <>
                {' '}
                <Box>{user.username}</Box>
                <Button onClick={logoutHandler} colorScheme="red" variant="outline">
                  logout
                </Button>
              </> //!
            ) : (
              <>
                {' '}
                <NavLink to="/signin">signin</NavLink>
                <NavLink to="/signup">signup</NavLink>
              </>
            )}
          </HStack>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavLink to="/">Home</NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

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
  Link,
  Image,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logoutThunk } from '../../redux/slices/authThunkActions';

export default function NavBar(): JSX.Element {
  const user = useAppSelector((state) => state.auth.userData);
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    void dispatch(logoutThunk());
  };
  return (
    <Box px={4} marginTop='10px' boxShadow='xs' bg='white'>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box>
            <Link href="/analysis">
              <Image
                width="130px"
                src="https://static.vecteezy.com/system/resources/previews/011/794/041/non_2x/one-hundred-dollar-bill-free-png.png"
                alt="Logo"
              />
            </Link>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Button>+</Button> 
            <Button>-</Button>
            <NavLink to="/analysys">Аналитика</NavLink>
            <NavLink to="/expinc">Доходы и расходы</NavLink>
            <NavLink to="/">Цели</NavLink>
            
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <HStack spacing={8} alignItems="center">
            <Box>{user.username}</Box>
            <Button onClick={logoutHandler}  variant="outline">
              logout
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}

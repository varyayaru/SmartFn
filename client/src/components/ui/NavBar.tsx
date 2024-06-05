import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Button,
  useDisclosure,
  useColorModeValue,
  Link,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logoutThunk } from '../../redux/slices/authThunkActions';
import ModalIncome from './ModalIncome';
import ModalConsumption from './ModalConsumption';

export default function NavBar(): JSX.Element {
  const user = useAppSelector((state) => state.auth.userData);
  const dispatch = useAppDispatch();
  const incomeDisclosure = useDisclosure();
  const consumptionDisclosure = useDisclosure();

  const logoutHandler = (): void => {
    void dispatch(logoutThunk());
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Box px={4} marginTop="10px" marginBottom="30px" boxShadow="xs" bg="white">
        <Flex h={16} alignItems="center" justifyContent="space-between" gap="10px">
          <Box>
            <Link href="/">
              <Image
                width="130px"
                src="https://static.vecteezy.com/system/resources/previews/011/794/041/non_2x/one-hundred-dollar-bill-free-png.png"
                alt="Logo"
              />
            </Link>
          </Box>
          {isMobile ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="link"
                color={useColorModeValue('gray.800', 'gray.200')}
                _hover={{ color: useColorModeValue('blue.600', 'blue.300') }}
                _active={{ color: useColorModeValue('blue.800', 'blue.500') }}
              >
                Меню
              </MenuButton>
              <MenuList minWidth="auto" right="35%" position="relative" textAlign="center">
                <MenuItem as={NavLink} to="/" justifyContent="center">
                  Аналитика
                </MenuItem>
                <MenuItem as={NavLink} to="/expinc" justifyContent="center">
                  Доходы и расходы
                </MenuItem>
                <MenuItem as={NavLink} to="/categories" justifyContent="center">
                  Категории
                </MenuItem>
                <MenuItem as={NavLink} to="/goals" justifyContent="center">
                  Цели
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack as="nav" spacing="20px" flexWrap="wrap">
              <Button onClick={incomeDisclosure.onOpen}>+</Button>
              <Button onClick={consumptionDisclosure.onOpen}>-</Button>
              <NavLink to="/">Аналитика</NavLink>
              <NavLink to="/expinc">Доходы и расходы</NavLink>
              <NavLink to="/categories">Категории</NavLink>
              <NavLink to="/goals">Цели</NavLink>
            </HStack>
          )}
          <NavLink onClick={logoutHandler}>Выйти</NavLink>
        </Flex>
      </Box>
      <ModalIncome isOpen={incomeDisclosure.isOpen} onClose={incomeDisclosure.onClose} />
      <ModalConsumption
        isOpen={consumptionDisclosure.isOpen}
        onClose={consumptionDisclosure.onClose}
      />
    </>
  );
}

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
  IconButton,
  Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
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
      <Box
        px={4}
        marginBottom="30px"
        bg="white"
        height="100%"
        textColor="white"
        fontSize="18px"
        color="black"
        marginTop='10px'
      >
        <Flex h={16} height="90px" alignItems="center" justifyContent="space-around" gap="10px">
          <Box>
            <Link href="/">
              <Image height="50px" src="../../../public/logo.png" alt="Logo" />
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
                <Button
                  onClick={incomeDisclosure.onOpen}
                  borderRadius="50%"
                  borderWidth="2px"
                  borderColor="grey"
                  backgroundColor="white"
                  fontSize="30px"
                  width="40px"
                  height="40px"
                  _hover={{ boxShadow: '0 0 10px green', color: 'black' }}
                >
                  +
                </Button>

                <Button
                  onClick={consumptionDisclosure.onOpen}
                  borderRadius="50%"
                  borderWidth="2px"
                  borderColor="grey"
                  backgroundColor="white"
                  fontSize="30px"
                  width="40px"
                  height="40px"
                  _hover={{ boxShadow: '0 0 10px red', color: 'black' }}
                >
                  -
                </Button>
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
              <Box display='flex' gap='16px' marginRight='10px'> 
              <Button
                onClick={incomeDisclosure.onOpen}
                borderRadius="50%"
                borderWidth="2px"
                borderColor="grey"
                backgroundColor="white"
                fontSize="30px"
                width="40px"
                height="40px"
                _hover={{ boxShadow: '0 0 10px green', color: 'black' }}
              >
               <Text> 
                +</Text>
              </Button>

              <Button
                onClick={consumptionDisclosure.onOpen}
                borderRadius="50%"
                borderWidth="2px"
                borderColor="grey"
                backgroundColor="white"
                fontSize="30px"
                width="40px"
                height="40px"
                _hover={{ boxShadow: '0 0 10px red', color: 'black' }}
              >
                <Text marginBottom='5px'> 
                -</Text>
              </Button></Box>
              <Box
                as={NavLink}
                to="/"
                _hover={{ textShadow: '0 0 10px green' }}
                textDecoration="none"
                px={2}
                py={1}
              >
                Аналитика
              </Box>
              <Box
                as={NavLink}
                to="/expinc"
                _hover={{ textShadow: '0 0 10px green' }}
                textDecoration="none"
                px={2}
                py={1}
              >
                Доходы и расходы
              </Box>
              <Box
                as={NavLink}
                to="/categories"
                _hover={{ textShadow: '0 0 10px green' }}
                textDecoration="none"
                px={2}
                py={1}
              >
                Категории
              </Box>
              <Box
                as={NavLink}
                to="/goals"
                _hover={{ textShadow: '0 0 10px green' }}
                textDecoration="none"
                px={2}
                py={1}
              >
                Цели
              </Box>
            </HStack>
          )}
          <IconButton
            icon={<MdLogout size="25px" onClick={logoutHandler} />}
            backgroundColor="white"
            size="lg"
          />
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

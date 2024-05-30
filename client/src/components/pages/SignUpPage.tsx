import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { AuthSignUpType } from '../../types/authTypes';
import { signUpThunk } from '../../redux/slices/authThunkActions';
import { useAppDispatch } from '../../hooks/reduxHooks';

const signUpFormVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const signUpHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as AuthSignUpType;
    void dispatch(signUpThunk(data));
  };

  return (
    <Flex justify="center">
      <Box bg={useColorModeValue('', 'gray.900')} w="lg" p={8} borderRadius="md">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          align="center"
          mb={4}
          color={useColorModeValue('gray.900', 'gray.100')}
        >
          SmartFin
        </Text>
        <motion.div variants={signUpFormVariants} initial="hidden" animate="show">
          <form onSubmit={signUpHandler}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Имя</FormLabel>
                <Input
                  placeholder="Имя"
                  name="username"
                  bg={useColorModeValue('gray.100', 'gray.900')}
                  color={useColorModeValue('current', 'white')}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  bg={useColorModeValue('gray.100', 'gray.900')}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Пароль</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  bg={useColorModeValue('gray.100', 'gray.900')}
                />
                <Text mt={1} color={useColorModeValue('gray.900', 'gray.100')}>
                  Длина не менее 8 символов
                </Text>
              </FormControl>

              <Button type="submit" colorScheme="blue" w="full" mt={4}>
                Создать аккаунт
              </Button>
            </VStack>
          </form>
        </motion.div>
        <Flex direction="row" justifyContent="center" mt={6}>
          <span>Есть аккаунт? </span>
          <Link to="/signin">
            <Button variant="link" colorScheme="teal" size="sm">
              Войти
            </Button>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}

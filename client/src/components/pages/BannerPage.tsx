import React, { useState } from 'react';
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
  Grid,
  GridItem,
  Image,
  FormHelperText,
  FormErrorMessage,
  Show,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { signInThunk } from '../../redux/slices/authThunkActions';
import { setError } from '../../redux/slices/authSlice';

const formVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function HelperText({ validationError }): JSX.Element {
  return (
    <FormHelperText mt={1} color={useColorModeValue('gray.900', 'gray.100')}>
      {validationError}
    </FormHelperText>
  );
}

export default function BannerPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const error = useAppSelector((store) => store.auth.error);
  const [input, setInput] = useState({ email: '', password: '' });
  const [validationError, setValidationError] = useState('');

  const signInHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (input) {
      try {
        const resultAction = await dispatch(signInThunk(input));
        unwrapResult(resultAction);
        setValidationError('');
        dispatch(setError(''));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(setError(err.message));
        }
      }
      if (input.password.length <= 8) {
        setValidationError('Очки надень инвалид!');
      }
    }
  };

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={{ base: 5, md: 5 }}>
      <Show above='sm'>
        <GridItem>
          <Box py={{ base: 5, md: 10 }} borderRadius="fmd">
            <Image
              src="https://masterpiecer-images.s3.yandex.net/58ffc6216f5311eeb1704659bdca6a39:upscaled"
              alt="Dan Abramov"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
        </GridItem>
      </Show>
      <GridItem>
        <Flex direction={{ base: 'column', md: 'row' }} justify="center">
          <Box bg={useColorModeValue('', 'gray.900')} p={{ base: 4, md: 8 }} borderRadius="md">
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="bold"
              align="center"
              mb={4}
              color={useColorModeValue('gray.900', 'gray.100')}
            >
              SmartFin
            </Text>
            <motion.div variants={formVariants} initial="hidden" animate="show">
              <form onSubmit={signInHandler}>
                <VStack spacing={{ base: 4, md: 6 }}>
                  <FormControl isRequired>
                    <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={input.email}
                      onChange={(e) => setInput({ ...input, email: e.target.value })}
                      bg={useColorModeValue('gray.100', 'gray.900')}
                    />
                  </FormControl>

                  <FormControl isRequired isInvalid={error || !!validationError}>
                    <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Пароль</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={(e) => setInput({ ...input, password: e.target.value })}
                      placeholder="Пароль"
                      bg={useColorModeValue('gray.100', 'gray.900')}
                    />
                    {validationError && <HelperText validationError={validationError} />}
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    w={{ base: 'full', md: 'auto' }}
                    h={{ base: '40px', md: 'auto' }}
                    mt={4}
                    variant="ghost"
                  >
                    Войти
                  </Button>
                </VStack>
              </form>
            </motion.div>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              alignItems="center"
              justifyContent="center"
              mt={6}
            >
              <span>Не зарегистрированы? </span>
              <Link to="/signup">
                <Button variant="link" colorScheme="teal" size={{ base: 'sm', md: 'sm' }}>
                  Зарегистрироваться
                </Button>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}

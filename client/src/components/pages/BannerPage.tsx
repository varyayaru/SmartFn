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
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/reduxHooks';
import type { AuthSignInType } from '../../types/authTypes';
import { signInThunk } from '../../redux/slices/authThunkActions';

const formVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BannerPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const signInHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as AuthSignInType;
    void dispatch(signInThunk(data));
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={5}>
      <GridItem>
        <Box py={10} borderRadius="fmd">
          <Image
            src="https://masterpiecer-images.s3.yandex.net/58ffc6216f5311eeb1704659bdca6a39:upscaled"
            alt="Dan Abramov"
            objectFit="cover"
            borderRadius="md"
          />
        </Box>
      </GridItem>
      <GridItem>
        <Flex direction="row" justify="center">
          <Box bg={useColorModeValue('', 'gray.900')} p={8} borderRadius="md">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              align="center"
              mb={4}
              color={useColorModeValue('gray.900', 'gray.100')}
            >
              SmartFin
            </Text>
            <motion.div variants={formVariants} initial="hidden" animate="show">
              <form onSubmit={signInHandler}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Email"
                      name="email"
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
                    Войти
                  </Button>
                </VStack>
              </form>
            </motion.div>
            <Flex direction="column" justifyContent="center" mt={6}>
              <span>Не зарегистрированы? </span>
              <Link to="/signup">
                <Button variant="link" colorScheme="teal" size="sm">
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

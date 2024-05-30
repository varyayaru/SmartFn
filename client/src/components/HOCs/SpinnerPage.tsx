import React from 'react';
import { Container, Flex, Spinner } from '@chakra-ui/react';

export default function SpinnerPage(): JSX.Element {
  return (
    <Flex height="100vh" justify="center" alignItems="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );
}

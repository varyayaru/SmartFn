import { ArrowRightIcon } from '@chakra-ui/icons';
import { ChakraProvider, Flex, ListItem, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const items = [
  { name: 'Item 1', price: 1000 },
  { name: 'Item 2', price: 2000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 1', price: 1000 },
  { name: 'Item 2', price: 2000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 3', price: 3000 },
];

export default function ListCard({ name, price, style, index }): JSX.Element {
  return (
   


    <ListItem border="1px solid grey" p={1} minHeight={35} maxHeight={35} width={315}>
      <Flex gap={3} alignItems="center" justifyContent="space-between">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <ArrowRightIcon />
          <Text fontSize="md" color="grey">
            {items[index]?.name}
          </Text>
        </div>
        <Stack direction="row">
          <Text color="tomato" fontSize="xl">
            {items[index]?.price}
          </Text>
        </Stack>
      </Flex>
    </ListItem>

  );
}

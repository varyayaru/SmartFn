import React from 'react';
import { Box, Flex, ListItem, Stack, Text } from '@chakra-ui/react';
import { ArrowRightIcon, SmallCloseIcon } from '@chakra-ui/icons';

export default function ListCard({ index, style, item }) {
  return (
    <ListItem
      style={style}
      border="1px solid grey"
      p={1}
      minHeight={35}
      maxHeight={250}
      width={315}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <div style={{ display: 'flex', gap: '10px', alignItems:'center' }}>
        <SmallCloseIcon  />
        <Text fontSize="md" color="grey">
          {item.Category ? (
            <Box gap="5">
              {item.Category.emoji} {item.Category.name}
            </Box>
          ) : (
            ''
          )}
        </Text>
      </div>
      <Stack direction="row">
        <Text color={item.Category ? 'tomato' : 'green'} fontSize="xl">
          {item.sum} ₽
        </Text>
      </Stack>
    </ListItem>
  );
}

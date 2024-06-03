import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  FormHelperText,
  useColorModeValue,
  Box,
  Text,
  Grid,
} from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';

export default function ModalConsumption({ isOpen, onClose }): JSX.Element {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onClose();
  };

  const kakakakaka = [
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
    { emoji: '💩', text: 'kakakakaka' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4" w={{ base: '90%', md: '500px' }}>
        <ModalHeader>Ваш расход</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={submitHandler}>
            <FormControl>
              <FormLabel>Сумма:</FormLabel>
              <Input type="text" name="name" />
              <FormHelperText mt={5}>Выберите категорию:</FormHelperText>
              <Box
                bg={useColorModeValue('gray.100', 'gray.900')}
                mt={1}
                px={4}
                py={4}
                boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.1)"
                borderRadius="md"
                mb={3}
                overflowY="scroll"
                maxHeight="200px"
              >
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {kakakakaka.map((item, index) => (
                    <Box key={index} display="flex" flexDirection="column" alignItems="center">
                      <Text fontSize={{ base: 'lg', md: 'xx-large' }}>{item.emoji}</Text>
                      <Text fontSize={{ base: 'sm', md: 'md' }}>{item.text}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            </FormControl>
            <Box display="flex" justifyContent="center" mt={2}>
              <IconButton
                mt="20px"
                type="submit"
                icon={<MinusIcon />}
                colorScheme="red"
                aria-label="Submit"
                borderRadius="full"
                size="lg"
              />
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

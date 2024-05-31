import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
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
  Flex,
  Grid,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

export default function ModalConsumption({ isOpen, onClose }): JSX.Element {
  //   const [chosenEmoji, setChosenEmoji] = useState(null);

  //   const onEmojiClick = (event, emojiObject) => {
  //     setChosenEmoji(emojiObject);
  //   };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onClose();
  };

  const kaka = [
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
    { emoji: '💩', text: 'kaka' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
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
                mt={3}
                px={4}
                py={4}
                boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.1)"
                borderRadius="md"
                mb={4}
                overflowX="auto"
                whiteSpace="nowrap"
                maxHeight="200px"
              >
                <Flex wrap="nowrap" justify="flex-start">
                  {kaka.map((item, index) => (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      mr={9}
                      mt={5}
                    >
                      {/* <Grid templateColumns="repeat(5, 1fr)" gap={1}> */}
                      <Text>{item.emoji}</Text>
                      <Text>{item.text}</Text>
                      {/* </Grid> */}
                    </Box>
                  ))}
                </Flex>
              </Box>
            </FormControl>
            <Box display="flex" justifyContent="center" mt={2}>
              <IconButton
                type="submit"
                icon={<CheckIcon />}
                colorScheme="green"
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

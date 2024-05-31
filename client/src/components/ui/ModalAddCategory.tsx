import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function ModalAddCategory({ isOpen, onClose }): JSX.Element {
    const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Название категории</FormLabel>
              <Input placeholder="Wildberries" />
            </FormControl>

        
          </ModalBody>
          <EmojiPicker onEmojiClick={onEmojiClick} />
                {chosenEmoji && <p>Вы выбрали: {chosenEmoji.emoji}</p>}
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>{' '}
    </>
  );
}

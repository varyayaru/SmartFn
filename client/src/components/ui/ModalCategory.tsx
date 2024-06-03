import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

export default function ModalCategory({ title, isOpen, onClose }): JSX.Element {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (emojiObject) => {
    console.log(emojiObject);
    setChosenEmoji(emojiObject);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent  maxWidth="400px">
        <ModalHeader> </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>{title}</FormLabel>
            <Input placeholder="Wildberries" />
          </FormControl>
          <Box mt={4}>
            <Picker
              onEmojiClick={onEmojiClick}
              previewConfig={{ showPreview: false }}
              searchDisabled
              title=""
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box width="100%" display="flex" justifyContent="center">
            <IconButton
              marginBottom="40px"
              type="submit"
              icon={<CheckIcon />}
              colorScheme="green"
              aria-label="Submit"
              borderRadius="full"
              size="lg"
              mt={4}
            />
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

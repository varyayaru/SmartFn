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
import React, { useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';

type ModalCategoryProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  initialValues?: { name: string; emoji: string };
  // catId: number;
};

export default function ModalCategory({
  title,
  isOpen,
  onClose,
  onSubmit,
  initialValues = { name: '', emoji: '' },
  // catId,
}: ModalCategoryProps): JSX.Element {
  const [emoji, setEmoji] = useState(initialValues.emoji);
  // const [name, setName] = useState(initialValues.name);

  // useEffect(() => {
  //   setEmoji(initialValues.emoji);
  //   setName(initialValues.name);
  // }, [initialValues]);

  const onEmojiClick = (emojiObject) => {
    setEmoji(emojiObject.emoji);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="400px">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel>Название категории</FormLabel>
              <Input
                name="name"
                placeholder="Wildberries"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <Box mt={4}>
              <Picker
                onEmojiClick={onEmojiClick}
                previewConfig={{ showPreview: false }}
                searchDisabled
                title=""
              />
              <Input name="emoji" type="hidden" value={emoji} />
            </Box>
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
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

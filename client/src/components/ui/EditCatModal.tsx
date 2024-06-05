import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
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
import { useAppDispatch } from '../../hooks/reduxHooks';
import { getCategoriesThunk, updateCategoriesThunk } from '../../redux/slices/CatThunkAction';

type ModalCategoryProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;

  catId: number;
  catEmoji: string;
  catName: string;
};

export default function EditCatModal({
  title,
  isOpen,
  onClose,
  catId,
  catEmoji,
  catName,
}: ModalCategoryProps): JSX.Element {
  const [emoji, setEmoji] = useState(catEmoji);
  const [name, setName] = useState(catName);
  const dispatch = useAppDispatch();

  const upDateHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = { name, emoji };

    void dispatch(updateCategoriesThunk({ ...formData, id: catId }));
    onClose();
  };

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
          <form onSubmit={upDateHandler}>
            <FormControl>
              <FormLabel>Название категории</FormLabel>
              <Input
                name="name"
                placeholder="Wildberries"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

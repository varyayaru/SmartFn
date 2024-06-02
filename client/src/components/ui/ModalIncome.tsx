import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  FormHelperText,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function ModalIncome({ isOpen, onClose }): JSX.Element {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={{ base: 2, sm: 4 }} width={{ base: '90%', md: '500px' }}>
        <ModalHeader>Ваш доход</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={submitHandler}>
            <FormControl>
              <FormLabel>Сумма:</FormLabel>
              <Input type="text" name="name" />
              <FormHelperText>Выберите категорию:</FormHelperText>
            </FormControl>
            <Box display="flex" justifyContent="center" mt={4}>
              <IconButton
                mt="20px"
                type="submit"
                icon={<AddIcon />}
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

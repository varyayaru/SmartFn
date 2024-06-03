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
import { CheckIcon } from '@chakra-ui/icons';

export default function ModalIncome({ isOpen, onClose }): JSX.Element {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ваш доход</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={submitHandler}>
            <FormControl>
              <FormLabel>Сумма:</FormLabel>
              <Input type="text" name="name" />
              <FormHelperText>Выберите категорию:</FormHelperText>
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

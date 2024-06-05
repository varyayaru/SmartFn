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
  Input,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { getCreateIncome } from '../../redux/slices/transThunkActions';

export default function ModalIncome({ isOpen, onClose }): JSX.Element {
  const dispatch = useAppDispatch();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formSum = Object.fromEntries(new FormData(e.currentTarget));
    void dispatch(getCreateIncome(formSum));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4" w={{ base: '90%', md: '500px' }}>
        <ModalHeader>Ваш доход</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={submitHandler}>
            <FormControl>
              <FormLabel>Сумма:</FormLabel>
              <Input type="number" name="sum" />
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

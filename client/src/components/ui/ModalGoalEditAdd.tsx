import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
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
import React from 'react';

export default function ModalGoalEditAdd({ isOpen, onClose, title, addHandler }): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={addHandler}>
          <ModalBody>
            <Input placeholder="Название цели" name="name" autoFocus required />
            <Input placeholder="Цена цели" name="sum" mt={4} type="number" required />
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
        </form>
      </ModalContent>
    </Modal>
  );
}

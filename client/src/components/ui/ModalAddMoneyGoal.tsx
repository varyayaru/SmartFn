import React from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
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

export default function ModalAddMoneyGoal({ addIsOpen, addOnClose }): JSX.Element {
  return (
    <Modal isOpen={addIsOpen} onClose={addOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Пополнить цель</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="+" mt={4} />
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

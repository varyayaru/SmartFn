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

export default function ModalGoalEditAdd({isOpen,onClose,title}): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Название цели" autoFocus />
          <Input placeholder="Цена цели" mt={4} />
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

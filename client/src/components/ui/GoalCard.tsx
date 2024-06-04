import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  Heading,
  IconButton,
  Progress,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import ModalGoalEditAdd from './ModalGoalEditAdd';
import ModalAddMoneyGoal from './ModalAddMoneyGoal';

export default function GoalCard(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: addIsOpen, onOpen: addOnOpen, onClose: addOnClose } = useDisclosure();
  return (
    <Card maxW="sm" mb={6}>
      <CardBody>
        <Heading size="md">Car</Heading>
        <Progress marginTop="100px" hasStripe transitionDuration="0.2s" />
        <Box
          p={7}
          borderRadius="md"
          boxShadow="md"
          mt={7}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="lg">2000 ₽</Text>
          <Box display="flex" alignItems="center">
            <AddIcon
              marginRight="15px"
              onClick={() => {
                addOnOpen();
              }}
            />
            <EditIcon
              marginRight="15px"
              onClick={() => {
                onOpen();
              }}
            />
            <DeleteIcon />
          </Box>
        </Box>
      </CardBody>
      <ModalGoalEditAdd isOpen={isOpen} onClose={onClose} title="Редактировать цель" />
      <ModalAddMoneyGoal addIsOpen={addIsOpen} addOnClose={addOnClose} />
    </Card>
  );
}

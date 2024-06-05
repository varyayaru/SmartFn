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
import { useAppDispatch } from '../../hooks/reduxHooks';
import { deleteGoalThunk, editGoalThunk } from '../../redux/slices/goalsThunkActions';
import { setSelectedGoal } from '../../redux/slices/goalSlice';

export default function GoalCard({ goal }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: addIsOpen, onOpen: addOnOpen, onClose: addOnClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const deleteHandler = (id) => {
    void dispatch(deleteGoalThunk(id));
  };
  const editHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.id = goal.id;
    void dispatch(editGoalThunk(data));
    onClose();
  };
  const open = (goal) => {
    dispatch(setSelectedGoal(goal));
  };

  const sumTrans = goal?.TransGoals?.map((el) => el.Transaction).reduce(
    (acc, el) => (acc += el.sum),
    0,
  );
  return (
    <Card maxW="sm" mb={6}>
      <CardBody>
        <Heading size="md">{goal.name}</Heading>
        <Progress
          colorScheme="pink"
          marginTop="100px"
          hasStripe
          transitionDuration="0.2s"
          size="lg"
          value={sumTrans}
          max={goal.sum}
        />
        <Box
          p={7}
          borderRadius="md"
          boxShadow="md"
          mt={7}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="lg">{goal.sum}₽</Text>
          <Box display="flex" alignItems="center">
            <AddIcon
              marginRight="15px"
              onClick={() => {
                // addOnOpen();
                open(goal);
              }}
            />
            <EditIcon
              marginRight="15px"
              onClick={() => {
                onOpen();
              }}
            />
            <DeleteIcon
              onClick={() => {
                deleteHandler(goal.id);
              }}
            />
          </Box>
        </Box>
      </CardBody>
      <ModalGoalEditAdd
        isOpen={isOpen}
        onClose={onClose}
        title="Редактировать цель"
        addHandler={editHandler}
      />
      <ModalAddMoneyGoal addIsOpen={addIsOpen} addOnClose={addOnClose} />
    </Card>
  );
}

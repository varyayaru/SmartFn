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

  const sumTrans =
    goal?.TransGoals?.map((el) => el.Transaction).reduce((acc, el) => (acc += el.sum), 0) || 0;

  console.log(sumTrans);

  return (
    <Card maxW="sm" mb={6} boxShadow="dark-lg" borderRadius="md">
      <CardBody display="flex" flexDirection="column" alignItems="center" gap={4}>
        <Heading size="md">{goal.name}</Heading>
        <Progress
          mt={10}
          colorScheme="purple"
          hasStripe
          transitionDuration="0.2s"
          size="lg"
          value={sumTrans}
          max={goal.sum}
          width="100%"
        />
        <Text fontSize="lg">
          {sumTrans || '0'}₽ из {goal.sum}₽
        </Text>
        <Box
          p={4}
          borderRadius="md"
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.20)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          width="100%"
        >
          {goal.sum > sumTrans ? (
            <Box display="flex" justifyContent="center" gap={4}>
              <IconButton
                icon={<AddIcon />}
                onClick={() => {
                  open(goal);
                }}
                aria-label="Add money to goal"
              />
              <IconButton icon={<EditIcon />} onClick={onOpen} aria-label="Edit goal" />
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => {
                  deleteHandler(goal.id);
                }}
                aria-label="Delete goal"
              />
            </Box>
          ) : (
            <>
              <Text fontSize="lg">Цель закрыта</Text>
              <Box display="flex" justifyContent="center" gap={4}>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => {
                    deleteHandler(goal.id);
                  }}
                  aria-label="Delete goal"
                />
              </Box>
            </>
          )}
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

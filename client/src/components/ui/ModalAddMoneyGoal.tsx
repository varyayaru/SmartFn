import React, { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setSelectedGoal } from '../../redux/slices/goalSlice';
import { addMoneyGoalThunk } from '../../redux/slices/goalsThunkActions';

export default function ModalAddMoneyGoal({ addIsOpen, addOnClose }): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedGoal = useAppSelector((state) => state.goals.selectedGoal);
  const addMoney = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.id = selectedGoal.id;
    console.log(data);
    void dispatch(addMoneyGoalThunk(data));
  };
  const onClose = (): void => {
    dispatch(setSelectedGoal(null));
  };
  return (
    <Modal isOpen={!!selectedGoal} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Пополнить цель</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={addMoney}>
          <ModalBody>
            <Input placeholder="+" name="sum" mt={4} />
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

import { Button, Card, createIcon, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ModalGoalEditAdd from './ModalGoalEditAdd';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { createGoalThunk } from '../../redux/slices/goalsThunkActions';

const PlusIcon = createIcon({
  displayName: 'PlusIcon',
  viewBox: '0 0 50 50',
  path: (
    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
  ),
});
export default function AddGoalCard(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const addHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    void dispatch(createGoalThunk(data));
    onClose();
  };
  return (
    <Card minH="200px" variant="unstyled" mb={6} alignItems="center" justifyContent="center">
      <Button
        onClick={onOpen}
        variant="unstyled"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100px"
        height="100px"
        padding="0"
        _hover={{ bg: 'none' }}
        _active={{ bg: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <PlusIcon boxSize="100%" />
      </Button>

      <ModalGoalEditAdd
        isOpen={isOpen}
        onClose={onClose}
        title="Добавить цель"
        addHandler={addHandler}
      />
    </Card>
  );
}

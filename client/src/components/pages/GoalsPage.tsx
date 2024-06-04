import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Heading,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Box,
  IconButton,
  Grid,
  Spacer,
  Center,
  Text,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

export default function GoalsPage(): JSX.Element {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const [goals, setGoals] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [goalName, setGoalName] = useState('');
  const [goalPrice, setGoalPrice] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);

  const addGoal = (name) => {
    if (name.trim() !== '' && goalPrice.trim() !== '') {
      setGoals([...goals, { name, price: parseFloat(goalPrice) }]);
      onAddClose();
      setGoalPrice('');
    }
  };

  const editGoal = (updatedName, updatedPrice) => {
    if (updatedName.trim() !== '' && updatedPrice.trim() !== '') {
      const updatedGoals = goals.map((goal) =>
        goal.name === selectedGoal.name
          ? { ...goal, name: updatedName, price: parseFloat(updatedPrice) }
          : goal,
      );
      setGoals(updatedGoals);
      onEditClose();
    }
  };

  const deleteGoal = (goalToDelete) => {
    setGoals(goals.filter((goal) => goal.name !== goalToDelete));
  };

  const addToCurrentAmount = (amount) => {
    setCurrentAmount((prevAmount) => prevAmount + amount);
  };

  return (
    <div>
      <Center h="20vh">
        <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={onAddOpen}>
          Добавить цель
        </Button>
      </Center>
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить цель</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Название цели"
              autoFocus
              onChange={(e) => setGoalName(e.target.value)}
            />
            <Input placeholder="Цена цели" mt={4} onChange={(e) => setGoalPrice(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => addGoal(goalName)}>
              Добавить
            </Button>
            <Button variant="ghost" onClick={onAddClose}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактировать цель</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Название цели"
              defaultValue={selectedGoal?.name || ''}
              onChange={(e) => setSelectedGoal({ ...selectedGoal, name: e.target.value })}
            />
            <Input
              placeholder="Цена цели"
              mt={4}
              defaultValue={selectedGoal?.price.toString() || ''}
              onChange={(e) =>
                setSelectedGoal({ ...selectedGoal, price: parseFloat(e.target.value) })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => editGoal(selectedGoal.name, selectedGoal.price)}
            >
              Сохранить
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {!goals.length ? (
        <Center h="80vh">
          <Heading marginBottom="250px" size="xl">
            У вас нет целей
          </Heading>
        </Center>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {goals.map((goal, index) => (
            <Card key={index} maxW="sm" mb={6}>
              <CardBody>
                <Heading size="md">{goal.name}</Heading>
                <Progress
                  marginTop="100px"
                  hasStripe
                  value={Math.min((currentAmount / goal.price) * 100, 100)}
                  transitionDuration="0.2s"
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
                  <Text fontSize="lg">{goal.price.toLocaleString()} ₽</Text>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      aria-label="Редактировать"
                      icon={<EditIcon />}
                      marginRight="10px"
                      onClick={() => {
                        setSelectedGoal(goal);
                        onEditOpen();
                      }}
                    />
                    <IconButton
                      aria-label="Удалить"
                      
                      icon={<DeleteIcon />}
                      marginRight="10px"
                      onClick={() => deleteGoal(goal.name)}
                    />
                  </Box>
                </Box>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </div>
  );
}

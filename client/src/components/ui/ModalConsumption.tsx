import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  FormHelperText,
  useColorModeValue,
  Box,
  Grid,
  Button,
} from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getCategoryThunk } from '../../redux/slices/catsThunkActions';
import { getCreateExpend } from '../../redux/slices/transThunkActions';

export default function ModalConsumption({ isOpen, onClose }): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории
  const [expenseAmount, setExpenseAmount] = useState(''); // Состояние для суммы расхода

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.catId = selectedCategory;

    void dispatch(getCreateExpend(data));
    onClose();
  };

  useEffect(() => {
    void dispatch(getCategoryThunk());
  }, [dispatch]);

  const expendStor = useAppSelector((store) => store.cats.categories);
  console.log(expendStor);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Обновляем выбранную категорию
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4" w={{ base: '90%', md: '500px' }}>
        <ModalHeader>Ваш расход</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={submitHandler}>
            <FormControl>
              <FormLabel>Сумма:</FormLabel>
              <Input
                type="number"
                name="sum"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
              <FormHelperText mt={5}>Выберите категорию:</FormHelperText>
              <Box
                bg={useColorModeValue('gray.100', 'gray.900')}
                mt={1}
                px={4}
                py={4}
                boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.1)"
                borderRadius="md"
                mb={3}
                overflowY="scroll"
                maxHeight="200px"
              >
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {expendStor.map((item) => (
                    <Button
                      key={item.id}
                      leftIcon={item.emoji}
                      variant="outline"
                      colorScheme="teal"
                      onClick={() => handleCategoryClick(item.id)} // Обработчик клика на категорию
                      width="150px"
                    >
                      {item.name}
                    </Button>
                  ))}
                </Grid>
              </Box>
            </FormControl>
            <Box display="flex" justifyContent="center" mt={2}>
              <IconButton
                mt="20px"
                type="submit"
                icon={<MinusIcon />}
                colorScheme="red"
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

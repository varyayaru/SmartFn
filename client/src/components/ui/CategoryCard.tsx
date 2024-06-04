import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Card, CardBody, CardFooter, CardHeader, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ModalCategory from './ModalCategory';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { delCategoriesThunk, updateCategoriesThunk } from '../../redux/slices/CatThunkAction';

type CategoryCardProps = {
  emoji: string;
  name: string;
  catId: number;
};

export default function CategoryCard({ emoji, name, catId }: CategoryCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const deleteHandler = (id: number): void => {
    void dispatch(delCategoriesThunk(id));
  };

  const upDateHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as {
      name: string;
      emoji: string;
    };
    void dispatch(updateCategoriesThunk({ ...formData, id: catId }));
    onClose();
  };

  return (
    <>
      <Card alignItems="center" marginTop="50px">
        <CardHeader>
          <Text fontSize="8xl">{emoji}</Text>
        </CardHeader>
        <CardBody>
          <Text>{name}</Text>
        </CardBody>
        <CardFooter gap="20px">
          <EditIcon onClick={onOpen} />
          <DeleteIcon onClick={() => deleteHandler(catId)} />
        </CardFooter>
      </Card>
      <ModalCategory
        title="Редактировать категорию расходов"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={upDateHandler}
        initialValues={{ name, emoji }}
      />
    </>
  );
}

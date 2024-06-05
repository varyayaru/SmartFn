import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Card, CardBody, CardFooter, CardHeader, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ModalCategory from './ModalCategory';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { delCategoriesThunk, updateCategoriesThunk } from '../../redux/slices/CatThunkAction';
import EditCatModal from './EditCatModal';

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
      <EditCatModal
        title="Редактировать категорию расходов"
        isOpen={isOpen}
        onClose={onClose}
        catId={catId}
        catEmoji={emoji}
        catName={name}
        // onSubmit={upDateHandler}
        // initialValues={{ name, emoji }}
      />
    </>
  );
}

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import EditCategoryModal from './EditCategoryModal'
import ModalCategory from './ModalCategory';

export default function CategoryCard() : JSX.Element{
    const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <>
    <Card alignItems='center' marginTop='50px'>
    <CardHeader>
    <Text fontSize="8xl">👹</Text>
    </CardHeader>
    <CardBody>
      <Text>Наркотики</Text>
    </CardBody>
    <CardFooter gap='20px'>
    <EditIcon onClick={onOpen}/>
    <DeleteIcon/>
    </CardFooter>
  </Card>
  <ModalCategory title="Редактировать категорию расходов" isOpen={isOpen} onClose={onClose}/>
  </>
  )
}

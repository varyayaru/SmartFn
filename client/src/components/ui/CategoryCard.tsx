import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function CategoryCard() : JSX.Element{
  return (
    <Card alignItems='center' marginTop='50px'>
    <CardHeader>
    <Text fontSize="8xl">👹</Text>
    </CardHeader>
    <CardBody>
      <Text>Наркотики</Text>
    </CardBody>
    <CardFooter gap='20px'>
    <EditIcon/>
    <DeleteIcon/>
    </CardFooter>
  </Card>
  )
}

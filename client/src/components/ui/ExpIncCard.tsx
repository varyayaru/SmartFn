import React, { useState } from 'react';
import { Box, Button, Card, CardBody, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';

const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

type ExpIncCardTypes = {
  title: string;
  children: JSX.Element;
};
export default function ExpIncCard({ title, children }: ExpIncCardTypes): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };
  return (
   
    <Card minH="800px" alignContent='center' textAlign='center'>
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Flex align="center">
            <Button onClick={prevMonth}>&lt;</Button>
            <Box mx="4">
              <Text fontSize="xl" fontWeight="bold">
                {months[currentMonth]}
              </Text>
            </Box>
            <Button onClick={nextMonth}>&gt;</Button>
          </Flex>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned
            spaces and for people who love a chic design with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
        {children}
      </CardBody>
      <Divider />
    </Card>
  );
}

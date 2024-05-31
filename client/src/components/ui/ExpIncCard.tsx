import React, { useState } from 'react';
import { Box, Button, Card, CardBody, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import DonutChart from './DonutChart';

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export default function ExpIncCard({ title, children }): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <>
      <Card
        width="700px"
        minH="800px"
        justifyContent="center"
        alignContent="center"
        textAlign="center"
      >
        <CardBody>
          <Stack spacing="5">
            <Heading size="md">{title}</Heading>
            <Flex direction="column" align="center" justify="center" gap="30px">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={prevMonth}>&lt;</Button>
                <Box mx="4">
                  <Text fontSize="xl" fontWeight="bold">
                    {months[currentMonth]}
                  </Text>
                </Box>
                <Button onClick={nextMonth}>&gt;</Button>
              </div>

              {children}
            </Flex>
          </Stack>
        </CardBody>
        <Divider />
      </Card>{' '}
    </>
  );
}

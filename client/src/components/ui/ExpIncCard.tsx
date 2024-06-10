import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { ChatIcon } from '@chakra-ui/icons';
import { setPrevMonth, setNextMonth } from '../../redux/slices/transSlice';
import axiosInstance from '../../services/axiosInstance';
import { useAppSelector } from '../../hooks/reduxHooks';

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

export default function ExpIncCard({ title, children, chatHandler }): JSX.Element {
  const dispatch = useDispatch();
  const choosenMonth = useSelector((state) => state.trans.choosenMonth);
  const choosenYear = useSelector((state) => state.trans.choosenYear);
  const expends = useAppSelector((state) => state.trans.expends);
  const prevMonth = () => {
    dispatch(setPrevMonth());
  };

  const nextMonth = () => {
    dispatch(setNextMonth());
  };

  return (
    <Card
      width="700px"
      minH="800px"
      justifyContent="center"
      alignContent="center"
      textAlign="center"
      borderColor="transparent"
    >
      <CardBody borderRadius="md" borderWidth="2px" borderColor="grey">
        <Stack spacing="5">
          <Heading size="md">{title}</Heading>
          <Flex direction="column" align="center" justify="center" gap="30px">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={prevMonth}>&lt;</Button>
              <Box mx="4">
                <Text fontSize="xl" fontWeight="bold">
                  {months[choosenMonth - 1]} {choosenYear}
                </Text>
              </Box>
              <Button onClick={nextMonth}>&gt;</Button>
            </div>
            {children}
            <IconButton
              onClick={chatHandler}
              icon={<img src="../../public/chat.png" alt="chatgpt" />}
              backgroundColor="white"
              width="20px"
            />
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
}

import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, List, Text, UnorderedList, useColorModeValue } from '@chakra-ui/react';
import PieChart from '../ui/PieChart';
import BarChart from '../ui/BarChart';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getExpendsMonthThunk, getIncomesMonthThunk } from '../../redux/slices/transThunkAction';
import ListCard from '../ui/ListCard';

export const data = {
  labels: ['Доходы', 'Расходы'],
  datasets: [
    {
      label: 'Сумма',
      data: [12, 19], // данные здесь
      backgroundColor: ['rgba(94, 230, 83, 0.55)', 'rgba(233, 66, 66, 0.55)'],
      borderColor: ['rgba(94, 230, 83, 1)', 'rgba(233, 66, 66, 0.50)'],
      borderWidth: 1,
    },
  ],
};

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

export default function AnalysisPage(): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const dispatch = useAppDispatch();
  const month = useAppSelector((state) => state.trans.choosenMonth);
  const year = useAppSelector((state) => state.trans.choosenYear);

  useEffect(() => {
    void dispatch(getIncomesMonthThunk({ month, year }));
    void dispatch(getExpendsMonthThunk({ month, year }));
  }, [dispatch, month, year]);

  const incomes = useAppSelector((state) => state.trans.incomes);
  const expends = useAppSelector((state) => state.trans.expends);

  const prevMonth = (): void => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const nextMonth = (): void => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <Box mt={10} className="ChartBox">
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Box
          bg={useColorModeValue('gray.100', 'gray.900')}
          p={{ base: 2, md: 4 }}
          boxShadow="dark-lg"
          borderRadius="md"
          flex={{ base: '1', md: '2' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr={{ base: 0, md: 4 }}
          mb={{ base: 4, md: 0 }}
        >
          <BarChart />
        </Box>
        <Box
          bg={useColorModeValue('gray.100', 'gray.900')}
          p={{ base: 2, md: 4 }}
          boxShadow="dark-lg"
          borderRadius="md"
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="0"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <PieChart
              data={data}
              wid={{ base: '200px', md: '300px' }}
              hei={{ base: '200px', md: '300px' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <Button onClick={prevMonth}>&lt;</Button>
              <Box mx="4">
                <Text fontSize="xl" fontWeight="bold">
                  {months[currentMonth]}
                </Text>
              </Box>
              <Button onClick={nextMonth}>&gt;</Button>
            </div>
          </div>
        </Box>
      </Flex>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        mt={10}
        px={{ base: 2, md: 4 }}
        py={{ base: 2, md: 4 }}
        boxShadow="dark-lg"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Text>Some content here</Text>
      </Box>
    </Box>
  );
}

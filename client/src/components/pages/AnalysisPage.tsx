import React, { useEffect } from 'react';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import BarChart from '../ui/BarChart';
import { setNextMonth, setPrevMonth } from '../../redux/slices/transSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getExpendsMonthThunk, getIncomesMonthThunk } from '../../redux/slices/transThunkActions';
import AnalysisPieChart from '../ui/AnalysisPieChart';

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
  const dispatch = useDispatch();
  const choosenMonth = useAppSelector((state) => state.trans.choosenMonth);
  const choosenYear = useAppSelector((state) => state.trans.choosenYear);
  const month = useAppSelector((state) => state.trans.choosenMonth);
  const year = useAppSelector((state) => state.trans.choosenYear);

  useEffect(() => {
    void dispatch(getIncomesMonthThunk({ month, year }));
    void dispatch(getExpendsMonthThunk({ month, year }));
  }, [dispatch, month, year]);

  const incomes = useAppSelector((state) => state.trans.incomes);
  const expends = useAppSelector((state) => state.trans.expends);
  console.log(incomes);
  const prevMonth = () => {
    dispatch(setPrevMonth());
  };

  const nextMonth = () => {
    dispatch(setNextMonth());
  };

  const totalIncomesSum = incomes.reduce((acc, cur) => acc + cur.sum, 0);
  const totalExpendsSum = expends.reduce((acc, cur) => acc + cur.sum, 0);

  const data = {
    labels: ['💸', '🛍️'],
    datasets: [
      {
        label: '',
        data: [totalIncomesSum, totalExpendsSum],
        backgroundColor: ['rgba(94, 230, 83, 0.55)', 'rgba(233, 66, 66, 0.55)'],
        borderColor: ['rgba(94, 230, 83, 1)', 'rgba(233, 66, 66, 0.50)'],
        borderWidth: 1,
      },
    ],
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
            <AnalysisPieChart
              data={data}
              wid={{ base: '200px', md: '300px' }}
              hei={{ base: '200px', md: '300px' }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={prevMonth}>&lt;</Button>
              <Box mx="4">
                <Text fontSize="xl" fontWeight="bold">
                  {months[choosenMonth - 1]} {choosenYear}
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

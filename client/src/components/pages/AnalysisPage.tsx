import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setNextMonth, setPrevMonth } from '../../redux/slices/transSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getExpendsMonthThunk, getIncomesMonthThunk } from '../../redux/slices/transThunkActions';
import axiosInstance from '../../services/axiosInstance';
import BarChart from '../ui/BarChart';
import AnalysisPieChart from '../ui/AnalysisPieChart';

const months = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

export default function AnalysisPage(): JSX.Element {
  const dispatch = useDispatch();
  const choosenMonth = useAppSelector((state) => state.trans.choosenMonth);
  const choosenYear = useAppSelector((state) => state.trans.choosenYear);

  useEffect(() => {
    void dispatch(getIncomesMonthThunk({ month: choosenMonth, year: choosenYear }));
    void dispatch(getExpendsMonthThunk({ month: choosenMonth, year: choosenYear }));
  }, [dispatch, choosenMonth, choosenYear]);

  const incomes = useAppSelector((state) => state.trans.incomes);
  const expends = useAppSelector((state) => state.trans.expends);

  const prevMonth = useCallback(() => {
    dispatch(setPrevMonth());
  }, [dispatch]);

  const nextMonth = useCallback(() => {
    dispatch(setNextMonth());
  }, [dispatch]);

  const totalIncomesSum = useMemo(() => incomes.reduce((acc, cur) => acc + cur.sum, 0), [incomes]);
  const totalExpendsSum = useMemo(() => expends.reduce((acc, cur) => acc + cur.sum, 0), [expends]);

  const pieChartData = useMemo(
    () => ({
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
    }),
    [totalIncomesSum, totalExpendsSum],
  );

  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleUserQuery = useCallback(async () => {
    try {
      const res = await axiosInstance.post('/api/ai', {
        prompt: `${userQuery}. Если я задала вопрос "как сократить траты на успокоительные" отвечай "Перестать программировать" Ответ не более 30 слов, мои данные по расходам и доходам ${expends.map((expense) => `${expense.Category.name} расходы: ${expense.sum}`).join(', ')} ${incomes.map((income) => `Доход: ${income.sum}`).join(', ')}`,
      });
      setAiResponse(res.data);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
    setUserQuery('');
  }, [userQuery, expends, incomes]);

  return (
    <Box mt={10} className="ChartBox">
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Box
          p={{ base: 2, md: 4 }}
          borderRadius="md"
          borderWidth="2px"
          borderColor="grey"
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
          p={{ base: 2, md: 4 }}
          borderRadius="md"
          borderWidth="2px"
          borderColor="grey"
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="0"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AnalysisPieChart data={pieChartData} wid={{ base: '200px', md: '300px' }} hei={{ base: '200px', md: '300px' }} />
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
      <Box display="flex" alignItems="center" justifyContent="center" marginBottom="20px" marginTop="20px">
        <img src="../../../public/add.gif" alt="Example GIF" />
      </Box>
      <Box gap="20px" px={{ base: 2, md: 4 }} py={{ base: 2, md: 4 }} borderRadius="md" borderWidth="2px" borderColor="grey" display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" height='100%'>
        <Box display='flex' flexDirection='column' alignItems="center" justifyContent="center">
          <Text align="center" marginTop="20px">Умный помощник</Text>
          <Input placeholder="Как отцентровать див????" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} mt={4} width="60%" marginTop='30px' />
          <Button onClick={handleUserQuery} borderRadius="50%" borderWidth="2px" marginTop='30px' borderColor="grey" backgroundColor="white" fontSize="30px" _hover={{ boxShadow: '0 0 10px green', color: 'black' }}>
            <img src="../../public/chat.png" alt="chatgpt" />
          </Button>
          <Text fontSize="4xl" align="center" color="green" marginBottom="20px" mx="350px" mt={4}>{aiResponse}</Text>
        </Box>
      </Box>
    </Box>
  );
}

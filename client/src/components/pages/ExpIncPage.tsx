import React, { useEffect } from 'react';
import '../../css/expinc.css';
import { Flex, Box, UnorderedList } from '@chakra-ui/react';
import { FixedSizeList as List } from 'react-window';
import ExpIncCard from '../ui/ExpIncCard';
import ListCard from '../ui/ListCard';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  deleteExpThunk,
  deleteIncomeThunk,
  getExpendsMonthThunk,
  getIncomesMonthThunk,
} from '../../redux/slices/transThunkActions';
import ExpPieChart from '../ui/ExpPieChart';
import IncPieChart from '../ui/IncPieChart';

const generateColors = (numColors) => {
  const colors = [];
  const step = 360 / numColors;
  for (let i = 0; i < numColors; i++) {
    const hue = i * step;
    colors.push(`hsl(${hue}, 70%, 80%)`);
  }
  return colors;
};

export default function ExpIncPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const month = useAppSelector((state) => state.trans.choosenMonth);
  const year = useAppSelector((state) => state.trans.choosenYear);

  useEffect(() => {
    void dispatch(getIncomesMonthThunk({ month, year }));
    void dispatch(getExpendsMonthThunk({ month, year }));
  }, [dispatch, month, year]);

  const incomes = useAppSelector((state) => state.trans.incomes);
  const expends = useAppSelector((state) => state.trans.expends);
  // console.log(expends)
  const categoryData = expends.reduce((acc, transaction) => {
    if (!transaction || !transaction.Category) {
      // Если транзакция или категория отсутствуют, пропускаем текущую транзакцию
      return acc;
    }

    const categoryId = transaction.Category.id;
    const { emoji } = transaction.Category;
    const { sum } = transaction;

    if (!acc[categoryId]) {
      acc[categoryId] = {
        sum: 0,
        emoji,
      };
    }
    acc[categoryId].sum += sum;
    return acc;
  }, {});

  const totalIncomesSum = incomes.reduce((acc, transaction) => acc + transaction.sum, 0);

  // Создаем массив, содержащий только эмодзи для каждой категории
  const emojisArray = Object.values(categoryData).map((category) => category.emoji);
  const colors = generateColors(emojisArray.length);

  // Создаем data для PieChart
  const data = {
    labels: emojisArray, // Только эмодзи
    datasets: [
      {
        label: '',
        data: Object.values(categoryData).map((category) => category.sum),
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('50%)', '40%)')),
        borderWidth: 1,
      },
    ],
  };
  const deleteHandlerIncome = (id) => {
    void dispatch(deleteIncomeThunk(id));
  };
  const deleteHandlerExp = (id) => {
    void dispatch(deleteExpThunk(id));
  };
  return (
    <Flex
      marginTop="50px"
      direction={{ base: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <ExpIncCard title="ДОХОДЫ">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxW="300px"
          gap={4}
        >
          <Box width="100%" height="100%">
            <IncPieChart totalSum={totalIncomesSum} wid="100%" hei="100%" />
          </Box>
          <Box width="100%" height="250px" marginTop="20px">
            <UnorderedList styleType="none" margin={0}>
              <List height={250} itemCount={incomes.length} itemSize={35} width="100%">
                {({ index, style }) => (
                  <ListCard
                    index={index}
                    style={style}
                    item={incomes[index]}
                    deleteHandler={deleteHandlerIncome}
                  />
                )}
              </List>
            </UnorderedList>
          </Box>
        </Flex>
      </ExpIncCard>
      <ExpIncCard title="РАСХОДЫ">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxW="300px"
          gap={4}
        >
          <Box width="100%" height="auto">
            <ExpPieChart data={data} wid="100%" hei="100%" emojisArray={emojisArray} />
          </Box>
          <Box width="100%" height="250px" marginTop="20px">
            <UnorderedList styleType="none" margin={0}>
              <List height={250} itemCount={expends.length} itemSize={35} width="100%">
                {({ index, style }) => (
                  <ListCard
                    index={index}
                    style={style}
                    item={expends[index]}
                    deleteHandler={deleteHandlerExp}
                  />
                )}
              </List>
            </UnorderedList>
          </Box>
        </Flex>
      </ExpIncCard>
    </Flex>
  );
}

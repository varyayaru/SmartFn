import React, { useEffect } from 'react';
import '../../css/expinc.css';
import { Flex, Box, UnorderedList } from '@chakra-ui/react';
import { FixedSizeList as List } from 'react-window';
import ExpIncCard from '../ui/ExpIncCard';
import ListCard from '../ui/ListCard';
import PieChart from '../ui/PieChart';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getExpendsMonthThunk, getIncomesMonthThunk } from '../../redux/slices/transThunkAction';

export const data = {
  labels: [],
  datasets: [
    {
      label: 'Сумма',
      data: [12, 19],
      backgroundColor: ['rgba(94, 230, 83, 0.55)', 'rgba(233, 66, 66, 0.55)'],
      borderColor: ['rgba(94, 230, 83, 1)', 'rgba(233, 66, 66, 0.50)'],
      borderWidth: 1,
    },
  ],
};

export default function ExpIncPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const month = useAppSelector((state) => state.trans.choosenMonth);
  const year = useAppSelector((state) => state.trans.choosenYear);

  useEffect(() => {
    void dispatch(getIncomesMonthThunk({ month, year }));
    void dispatch(getExpendsMonthThunk({ month, year }));
  }, [dispatch, month, year]);

  console.log(month);

  const incomes = useAppSelector((state) => state.trans.incomes);
  const expends = useAppSelector((state) => state.trans.expends);

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
            <PieChart data={data} wid="100%" hei="100%" />
          </Box>
          <Box width="100%" height="250px" marginTop="20px">
            <UnorderedList styleType="none" margin={0}>
              <List height={250} itemCount={incomes.length} itemSize={35} width="100%">
                {({ index, style }) => (
                  <ListCard index={index} style={style} item={incomes[index]} />
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
            <PieChart data={data} wid="100%" hei="100%" />
          </Box>
          <Box width="100%" height="250px" marginTop="20px">
            <UnorderedList styleType="none" margin={0}>
              <List height={250} itemCount={expends.length} itemSize={35} width="100%">
                {({ index, style }) => (
                  <ListCard index={index} style={style} item={expends[index]} />
                )}
              </List>
            </UnorderedList>
          </Box>
        </Flex>
      </ExpIncCard>
    </Flex>
  );
}

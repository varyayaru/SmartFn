import React from 'react';
import '../../css/expinc.css';
import { Flex, UnorderedList } from '@chakra-ui/react';
import { FixedSizeList as List } from 'react-window';
import ExpIncCard from '../ui/ExpIncCard';
import DonutChart from '../ui/DonutChart';
import ListCard from '../ui/ListCard';
import PieChart from '../ui/PieChart';

const items = [
  { name: 'Item 1', price: 1000 },
  { name: 'Item 2', price: 2000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 1', price: 1000 },
  { name: 'Item 2', price: 2000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 3', price: 3000 },
  { name: 'Item 3', price: 3000 },
];

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

export default function ExpIncPage(): JSX.Element {
  return (
    <Flex alignItems="center" justifyContent="center" className="containerCards">
      <ExpIncCard title="ДОХОДЫ">
        <>
          <PieChart data={data} wid="300px" hei="300px" />
          <UnorderedList>
            <List height={250} itemCount={items.length} itemSize={35} width={315}>
              {({ index, style }) => <ListCard index={index} style={style} />}
            </List>
          </UnorderedList>
        </>
      </ExpIncCard>
      <ExpIncCard title="РАСХОДЫ">
        <>
          <PieChart data={data} />
          <UnorderedList>
            <List height={250} itemCount={items.length} itemSize={35} width={315}>
              {({ index, style }) => <ListCard index={index} style={style} />}
            </List>
          </UnorderedList>
        </>
      </ExpIncCard>
    </Flex>
  );
}

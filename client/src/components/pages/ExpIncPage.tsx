import React from 'react';
import '../../css/expinc.css';
import { Flex, UnorderedList } from '@chakra-ui/react';
import { FixedSizeList as List } from 'react-window';
import ExpIncCard from '../ui/ExpIncCard';
import DonutChart from '../ui/DonutChart';
import ListCard from '../ui/ListCard';

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
export default function ExpIncPage(): JSX.Element {
  const showScroll = items.length >= 9;

  return (
    <Flex alignItems="center" justifyContent="center" className="containerCards">
      <ExpIncCard title="ДОХОДЫ">
        <>
          <DonutChart />
          <UnorderedList>
            <List height={250} itemCount={items.length} itemSize={35} width={315}>
              {ListCard}
            </List>
          </UnorderedList>
        </>
      </ExpIncCard>
      <ExpIncCard title="РАСХОДЫ">
        <>
          <DonutChart />
          <UnorderedList>
            <List height={250} itemCount={items.length} itemSize={35} width={315}>
              {ListCard}
            </List>
          </UnorderedList>
        </>
      </ExpIncCard>
    </Flex>
  );
}

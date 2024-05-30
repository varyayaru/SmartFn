import React from 'react';
import '../../css/expinc.css';
import { Flex } from '@chakra-ui/react';
import ExpIncCard from '../ui/ExpIncCard';

export default function ExpIncPage(): JSX.Element {
  return (
    <Flex alignItems="center" justifyContent="center" className="containerCards" gap="20px">
      <ExpIncCard title={'ДОХОДЫ'}/>
      <ExpIncCard title={'РАСХОДЫ'}/>
    </Flex>
  );
}

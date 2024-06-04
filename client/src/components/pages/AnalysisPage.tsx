import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import PieChart from '../ui/PieChart';
import BarChart from '../ui/BarChart';

export default function AnalysisPage(): JSX.Element {
  return (
    <Box mt={10} className="ChartBox">
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Box
          bg={useColorModeValue('gray.100', 'gray.900')}
          px={4}
          py={4}
          boxShadow="dark-lg"
          borderRadius="md"
          flex="1"
          mr={{ base: 0, md: 6 }}
          mb={{ base: 6, md: 0 }}
        >
          <BarChart />
        </Box>
        <Box
          bg={useColorModeValue('gray.100', 'gray.900')}
          px={4}
          py={4}
          boxShadow="dark-lg"
          borderRadius="md"
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <PieChart />
        </Box>
      </Flex>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        mt={10}
        px={4}
        py={4}
        boxShadow="dark-lg"
        borderRadius="md"
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        cnskdjcnss
      </Box>
    </Box>
  );
}

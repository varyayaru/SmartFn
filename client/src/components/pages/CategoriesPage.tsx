import { Button, Card, CardBody, CardFooter, CardHeader, Grid, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import CategoryCard from '../ui/CategoryCard';
import AddCatCard from '../ui/AddCatCard';

export default function CategoriesPage(): JSX.Element {
  return (
    <SimpleGrid spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'>
        <AddCatCard/>
 <CategoryCard/>
 <CategoryCard/>
 <CategoryCard/>
 <CategoryCard/>
 <CategoryCard/>
 <CategoryCard/>
</SimpleGrid>
  );
}

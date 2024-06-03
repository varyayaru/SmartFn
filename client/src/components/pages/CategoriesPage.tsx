import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import CategoryCard from '../ui/CategoryCard';
import AddCatCard from '../ui/AddCatCard';

export default function CategoriesPage(): JSX.Element {
  return (
    <SimpleGrid spacing={4} minChildWidth="200px" templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
      <AddCatCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </SimpleGrid>
  );
}

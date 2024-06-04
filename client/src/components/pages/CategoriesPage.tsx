import { SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CategoryCard from '../ui/CategoryCard';
import AddCatCard from '../ui/AddCatCard';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getCategoriesThunk } from '../../redux/slices/CatThunkAction';

export default function CategoriesPage(): JSX.Element {
  const categories = useAppSelector((state) => state.cat.category);
  const dispatch = useAppDispatch();

  useEffect((): void => {
    void dispatch(getCategoriesThunk());
  }, [dispatch]);

  console.log(categories);

  return (
    <SimpleGrid
      spacing={4}
      minChildWidth="200px"
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <AddCatCard />
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          emoji={category.emoji}
          name={category.name}
          catId={Number(category.id)}
        />
      ))}
    </SimpleGrid>
  );
}

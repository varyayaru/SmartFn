import React from 'react';
import { Center, Heading, Text, Image } from '@chakra-ui/react';
// Импортируйте ваше изображение здесь
import errorImage from './path/to/error-image.jpg'; // Обновите путь к вашему изображению

export default function ErrorPage(): React.ReactElement {
  return (
    <Center
      fontFamily="Montserrat"
      fontWeight="bold"
      minH="100vh"
      flexDirection="column" // Указываем направление колонкой
      justifyContent="center" // Центрируем по вертикали
      alignItems="center" // Центрируем по горизонтали
    >
      <Heading as="h1" size="2xl" color="red.500" mb={4}>404</Heading>
      <Heading as="h1" size="xl" color="green.600">Super protection, called: 'ololo-Anton3000'</Heading>
      {/* Добавляем изображение */}
      <Image src={'/public/2024-06-05 15.23.07.jpg'} alt="Error Page Image" boxSize="400px" objectFit="cover" mt={6} />
    </Center>
  );
}

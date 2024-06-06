import React from 'react';
import { Container, Flex, Spinner, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion'; // Импортируем motion из Framer Motion

function Logo() {
  const animationVariants = {
    hidden: { y: -100 }, // Начальное состояние: смещение вверху
    visible: { 
      y: 0, // Конечное состояние: исходное положение
      transition: { 
        type: "spring", // Использование физической анимации
        stiffness: 120, // Регулирует жесткость анимации
        damping: 12, // Регулирует затухание анимации
        duration: 2, // Продолжительность анимации
      }
    },
  };

  return (
    <motion.div variants={animationVariants} initial="hidden" animate="visible">
      <Image src="/public/Untitled_logo_2_free-file.jpg" alt="Logo" boxSize="100px" />
    </motion.div>
  );
}

export default function SpinnerPage(): JSX.Element {
  return (
    <Flex height="100vh" justify="center" alignItems="center">
      <Logo />
    </Flex>
  );
}

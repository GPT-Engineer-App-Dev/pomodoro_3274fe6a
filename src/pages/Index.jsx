import React, { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes
  const toast = useToast();

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => {
          if (secondsLeft >= 1) return secondsLeft - 1;
          resetTimer();
          toast({
            title: "Time is up!",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
          return 0;
        });
      }, 1000);
    } else if (!isRunning && secondsLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, toast]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(25 * 60); // 25 minutes
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Container centerContent p={8}>
      <Heading mb={4}>Pomodoro Timer</Heading>
      <Box p={8} borderWidth="1px" borderRadius="lg">
        <Stack spacing={4} align="center">
          <Text fontSize="5xl" fontFamily="monospace">
            {formatTime(secondsLeft)}
          </Text>
          <Stack direction="row" spacing={4}>
            <Button leftIcon={<FaPlay />} onClick={startTimer} colorScheme="green" isDisabled={isRunning}>
              Start
            </Button>
            <Button leftIcon={<FaPause />} onClick={stopTimer} colorScheme="red" isDisabled={!isRunning}>
              Stop
            </Button>
            <Button leftIcon={<FaSync />} onClick={resetTimer} colorScheme="gray">
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Index;

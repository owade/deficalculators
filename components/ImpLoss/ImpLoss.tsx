import React, { useState, useEffect } from 'react';
import { Group, NumberInput, Container, Paper, Text } from '@mantine/core';

const ImpLoss = () => {
  const [valueA, setValueA] = useState(0);
  const [valueB, setValueB] = useState(0);
  const [res, setRes] = useState(0);

  // useEffect(() => {
  //   setRes(calculateLoss());
  // }, [valueA, valueB])

  const handleA = (e: any) => {
    //console.log(e)
    setValueA(Number(e))
  }
  const handleB = (e: any) => {
    setValueB(Number(e))
  }

  const calculateLoss = () => {
    let price_ratio = (valueA / 100 + 1) / (valueB / 100 + 1);
    let il = 2 * (price_ratio ** 0.5 / (1 + price_ratio)) - 1;
    return il * 100;
  }

  return (
    <Container>
      <Paper shadow="lg" p="lg">
        <Group position="center">
          <NumberInput
            value={valueA}
            label="Token A Percentage Change"
            onChange={handleA}
          />
          <NumberInput
            value={valueB}
            label="Token B Percentage Change"
            onChange={handleB}
          />
        </Group>
        <Text mt={10} align="center"> Impermanent Loss</Text>
        <Text align="center"> {calculateLoss().toFixed(3)} </Text>
      </Paper>

    </Container>

  );
}

export default ImpLoss;
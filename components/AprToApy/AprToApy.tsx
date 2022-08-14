import { Container, Grid, Group, Text, TextInput, Center, Title, Stack, Button, Select } from '@mantine/core';
import { useState, useEffect } from 'react';
import { ArrowsUpDown } from 'tabler-icons-react';

const AprToApy = () => {
  const [apyValue, setApyValue] = useState('634.8825336643637');
  const [aprValue, setAprValue] = useState('200');
  const [compFreq, setCompFreq] = useState('365');
  // APY = (1+APR%/m)^m - 1
  // APR = m[(1+APY%)^1/m - 1]
  //https://mindyourdecisions.com/blog/wp-content/uploads/2008/04/apy_into_apr_derivation.jpg

  const calculateApy = (event: any) => {
    const { value } = event.target;
    setAprValue(value);  // USE VALUE AND NOT APRVALUE SINCE IT DOES'NT SET STATE IMMEDIATELY!!! 
    console.log(+aprValue, value);
    //calc apy from apr next...
    let freq = parseInt(compFreq);
    let apr = parseInt(value) / 100;
    let res = (Math.pow((1 + (apr / freq)), freq)) - 1;
    let fres = res * 100;
    setApyValue(fres + '');
  }
  const calculateApr = (event: any) => {
    const { value } = event.target;
    setApyValue(event.target.value);
    //calc apr from apy next...
    let freq = parseInt(compFreq);
    let apy = parseInt(value) / 100;
    let res = freq * (Math.pow((1 + apy), (1 / freq)) - 1)
    let fres = res * 100;
    setAprValue(fres + '');
  }
  const handleSelect = (e: any) => {
    setCompFreq(e);
  }

  return (
    <Container mt={50}>
      <Stack sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 400 })} justify="center" align="center" >
        <Group  >
          <Text weight={700} mr={10} color="#3b5bdb" size={50} >FREQ</Text>
          {/*<Title>Freq</Title>*/}
          <Select
            mr={30}
            value={compFreq}
            onChange={handleSelect}
            size="lg"
            data={[
              { value: '365', label: 'Daily' },
              { value: '52', label: 'Weekly' },
              { value: '12', label: 'Monthly' },
              { value: '3', label: 'Quarterly' },
              { value: '2', label: 'Semi-Annually' },
              { value: '1', label: 'Annually' },
            ]}
          />

        </Group>
        <Group spacing={25}>
          <Text weight={700} color="#3b5bdb" size={50} >APR</Text>
          <TextInput size="xl" name="apr" value={aprValue} onChange={calculateApy} />
        </Group>
        <ArrowsUpDown
          style={{ marginLeft: '80px' }}
          size={50}
          strokeWidth={2}
        />
        <Group spacing={25}>
          <Text weight={700} color="#3b5bdb" size={50} >APY</Text>
          {/*<Title>APY</Title>*/}
          <TextInput size="xl" name="apy" value={apyValue} onChange={calculateApr} />
        </Group>
      </Stack>

    </Container>
  )
}

export default AprToApy;
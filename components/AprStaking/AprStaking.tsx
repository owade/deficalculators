import { Container, Group, Stack, Button, TextInput, Center, Text, Divider, Grid, Collapse, Table, Space } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconChevronUp, IconChevronDown } from '@tabler/icons';

export default function AprStaking() {
  let [initial, setInitial] = useState('1000');
  let [gas, setGas] = useState('5');
  let [apr, setApr] = useState('365');
  let [freq, setFreq] = useState('365');
  let [best, setBest] = useState<any[]>([5.62, 3084.066]);
  let [opened, setOpened] = useState(false);


  useEffect(() => {
    //let arr = generateArray();
    //let arr;
    const myPromise = new Promise<number[][]>((resolve) => { resolve(generateArray()) });
    myPromise.then((value) => { setBest(findOptimal(value)); });
    //myPromise.then((value) => { console.log(findOptimal(value)) });
    //console.log(best + '!!!!!!')
    // let fnl = findOptimal(arr);
    // setBest(fnl);
    //console.log(arr);
  }, [gas, initial, apr])

  const handleInitial = (e: any) => {
    setInitial(e.target.value);
  }
  const handleApr = (e: any) => {
    setApr(e.target.value);

    //setApy(fres => fres.toFixed(2) + '');
  }
  const handleApy = () => {
    //calc apy from apr next...
    let freqy = parseInt(freq);
    let aprv = parseInt(apr) / 100;
    let res = (Math.pow((1 + (aprv / freqy)), freqy)) - 1;
    let fres = res * 100;
    return fres.toFixed(2);
  }
  const handleGas = (e: any) => {
    setGas(e.target.value);
  }
  const handleFreq = (e: any) => {
    setFreq(e.target.value);
  }
  // Compounded Interest for Principal
  // CI = P(1 + r/n)^(nt)

  // Future Value of a Series
  // FV = PMT * (((1 + r / n) ** (n * t) - 1) / (r / n))

  // Total amount
  // T = CI + FV

  // Where:
  // PMT = addition freq / compound freq
  // CI = the future value of the investment/loan, including interest
  // P = Principal investment amount (the initial deposit or loan amount)
  // r = Annual interest rate (decimal)
  // n = Compound frequency per year
  // t = Investment time in years
  const handleFutureValue: any = () => {
    return calculatFutureValue(Number(freq), Number(initial), Number(apr), Number(gas));
  }

  const calculatFutureValue = (freqy: number, initialy: number, apry: number, gasy: number) => {
    let first = (1 + (apry / 100) / freqy);
    let sec = Math.pow(first, freqy * 1);
    let fin = initialy * sec;
    let fv = gasy * ((sec - 1) / ((apry / 100) / freqy));
    let total = fin - fv; // subtract gas fee from interest...
    return total.toFixed(2);
  }

  const handleProfit = () => {
    // FutureValue - initial
    return handleFutureValue() - Number(initial);
  }

  const generateArray = () => {
    let res: number[][] = [];
    for (let i = 1; i <= 365; i++) {
      let ans = Number(calculatFutureValue(i, Number(initial), Number(apr), Number(gas)));
      let sub = ans - Number(initial);
      res.push([i, ans, Number((sub / 10).toFixed(4))]);
    }
    return res;
  }

  //Check for 0 or undefined...
  const findOptimal = (arr: number[][]) => {
    let res = [];
    // console.log(arr[0][2])
    if (!(arr[0][2])) { return [null, null]; }
    for (let i = 0; i < arr.length - 1; i++) {
      let next = (arr[i + 1][2]);
      let curr = (arr[i][2]);
      if (next < curr) {
        res.push(i + 1, arr[i][2]);
        break;
      }
    }
    let len = arr.length, last = arr.at(-1)?.at(-1);
    return res.length !== 0 ? res : [len, last];
  }

  const calcIdealFreq = () => {
    //console.log(best);
    return (best[0] !== null) ? (365 / best[0]).toFixed(2) + " days" : 'N/a';
  }
  const calcIdealApy = () => {
    return (best[0] !== null) ? (best[1]).toFixed(2) + '%' : 'N/a';
  }
  const handleBreakdown = () => {
    setOpened((o) => !o);
  }

  const rows = generateArray().map((x, idx) => (
    <tr key={idx}>
      <td>{x[0]}</td>
      <td>{x[1]}</td>
      <td>{x[2]}</td>
    </tr>
  ));


  return (
    <Container mt={20}>
      <Grid>
        <Grid.Col md={6} lg={4}>
          <Stack >
            <Text weight={700}>Initial investment</Text>
            <TextInput size="md" value={initial} maxLength={10} onChange={handleInitial} />
            <Text weight={700} >Base Apr</Text>
            <TextInput size="md" value={apr} onChange={handleApr} />
            <Text weight={700}>Gas Cost</Text>
            <TextInput size="md" value={gas} onChange={handleGas} />
            <Text weight={700}>Compounding frequency(Optional)</Text>
            <TextInput size="md" value={freq} maxLength={5} onChange={handleFreq} />
          </Stack>
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <Stack>
            <Text weight={700} align="center" color="#3b5bdb">Future Value(1 Year)</Text>
            <Text weight={700} align="center" size={30}>{'$' + handleFutureValue() + ''}</Text>
            <Text weight={700} align="center" color="#3b5bdb">Initial Amount</Text>
            <Text weight={700} align="center" size={30}>{'$' + initial}</Text>
            <Text weight={700} align="center" color="#3b5bdb">Total Profit</Text>
            <Text weight={700} align="center" size={30}>{'$' + handleProfit() + ''}</Text>
            <Text weight={700} align="center" color="#3b5bdb">Effective Apy(1 year)</Text>
            <Text weight={700} align="center" size={30}>{handleApy() + '%'}</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <Stack>
            <Text weight={700} align="center" color="#3b5bdb">Real Apy...</Text>
            <Text weight={700} align="center" size={30}>{(handleProfit() / 10).toFixed(2) + '%'}</Text>
            <Text weight={700} align="center" color="#3b5bdb">Ideal frequency rate is after every..</Text>
            <Text weight={700} align="center" size={30}>{calcIdealFreq()}</Text>
            <Text weight={700} align="center" color="#3b5bdb">Apy will be..</Text>
            <Text weight={700} align="center" size={30}>{calcIdealApy()}</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col >
          <Divider my="md" size="lg" />
          <Center>
            <Button
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              rightIcon={opened ? (<IconChevronUp size={18} />) : (<IconChevronDown size={18} />)}
              onClick={handleBreakdown}
            >
              Breakdown
            </Button>
          </Center>
        </Grid.Col>
        <Grid.Col mt={40} span={12}>
          <Collapse in={opened}>
            <>
              <Text>Value after 1 year from compounding at different numbers of days...</Text>
              <Table horizontalSpacing={0}>
                <thead>
                  <tr>
                    <th>Freq(Days )</th>
                    <th>Final value</th>
                    <th>Effective Apy</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </>
          </Collapse>
        </Grid.Col>
      </Grid>
      <Divider my="md" size="lg" />
    </Container>
  );
}
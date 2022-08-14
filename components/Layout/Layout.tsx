import { NavbarSegmented } from './Navbar';
import { AppShell, Text, Navbar, Header, MediaQuery, Burger, useMantineTheme } from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import React, { useState } from 'react';
import {
  BellRinging,
  Receipt2,
} from 'tabler-icons-react';


const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(true);
  //const [active, setActive] = useState('');

  const item1 = [
    { link: 'aprtoapy', label: 'APR TO APY', icon: BellRinging },
    { link: 'aprstaking', label: 'APR STAKING', icon: Receipt2 },
  ];

  return (
    <AppShell

      navbar={


        <NavbarSegmented
          opened={opened}
          setOpened={setOpened}
        />


      }
      header={
        < Header height={70} p="md" >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={!opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text size="lg" weight={700}>DEFI CALCULATORS</Text>
            <ColorSchemeToggle />
          </div>
        </Header >
      }
    >
      {children}
    </AppShell >
  )
}

export default Layout;


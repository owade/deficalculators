import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, SegmentedControl, Text, createStyles, Anchor } from '@mantine/core';
import {
  ShoppingCart,
  License,
  Message2,
  BellRinging,
  Messages,
  Fingerprint,
  Key,
  Settings,
  TwoFA,
  Users,
  FileAnalytics,
  DatabaseImport,
  Receipt2,
  ReceiptRefund,
  Logout,
  SwitchHorizontal,
} from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  return {
    navbar: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },

    title: {
      textTransform: 'uppercase',
      letterSpacing: -0.25,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        },
      },
    },

    footer: {
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
      paddingTop: theme.spacing.md,
    },
  };
});

const tabs = [
  { link: 'aprtoapy', label: 'APR TO APY', icon: BellRinging },
  { link: 'aprstaking', label: 'APR STAKING', icon: Receipt2 },
  { link: 'ImpermanentLoss', label: 'Impermanent Loss', icon: Fingerprint },
];

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NavbarSegmented({ opened, setOpened }: Props) {
  const { classes, cx } = useStyles();
  const [section, setSection] = useState<any>('account');
  const [active, setActive] = useState<any>('Billing');

  const links = tabs.map((item: any) => (
    <Link href={`${item.link}`} key={item.label} passHref={true} >
      <a
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}

        onClick={(event: any) => {
          //event.preventDefault();
          setActive(item.label);
          setOpened(!opened);
        }}
      >
        <>
          <item.icon className={classes.linkIcon} />
          <span>{item.label}</span>
        </>
      </a>
    </Link>

  ));

  return (
    <Navbar height={840} width={{ sm: 300 }} p="md" hiddenBreakpoint="sm" hidden={opened} className={classes.navbar}>

      <Navbar.Section grow mt="sm">
        {links}
      </Navbar.Section>


    </Navbar>
  );
}
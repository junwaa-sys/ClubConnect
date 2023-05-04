import { useState } from 'react'
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Button,
  Flex,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

const HEADER_HEIGHT = rem(60)

interface HeaderResponsiveProps {
  links: { link: string; label: string }[]
  activeLink: string
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}))

export default function TopNav({ links, activeLink }: HeaderResponsiveProps) {
  const { logout, loginWithRedirect } = useAuth0()
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(activeLink)
  const { classes, cx } = useStyles()

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link)
      }}
    >
      {link.label}
    </a>
  ))
  return (
    <>
      <Header height={HEADER_HEIGHT} className={classes.root}>
        <Container className={classes.header}>
          <Group spacing={6}>
            <a
              href="/"
              onClick={() => {
                setActive('/')
              }}
            >
              <img src="/logo-full-rgb.png" alt="club connect" height="45" />
            </a>
          </Group>
          <Group spacing={5} className={classes.links}>
            <Group position="apart">
              <IfAuthenticated>
                <Group>{items}</Group>
                <Button
                  variant="outline"
                  radius="md"
                  onClick={() => {
                    logout()
                  }}
                  color="#78b29c"
                >
                  Sign out
                </Button>
              </IfAuthenticated>
              <IfNotAuthenticated>
                <Button
                  variant="outline"
                  radius="md"
                  onClick={() => {
                    loginWithRedirect()
                  }}
                  color="#78b29c"
                >
                  Sign in
                </Button>
              </IfNotAuthenticated>
            </Group>
            {/* {user && <p>Signed in as: {user?.nickname}</p>} */}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                <IfAuthenticated>
                  {items}{' '}
                  <Button
                    variant="outline"
                    radius="md"
                    onClick={() => {
                      logout()
                    }}
                    color="#78b29c"
                  >
                    Sign out
                  </Button>
                </IfAuthenticated>
                <IfNotAuthenticated>
                  <Button
                    variant="outline"
                    radius="md"
                    onClick={() => {
                      loginWithRedirect()
                    }}
                    color="#78b29c"
                  >
                    Sign in
                  </Button>
                </IfNotAuthenticated>
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
    </>
  )
}

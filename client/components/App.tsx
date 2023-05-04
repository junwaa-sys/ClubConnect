import { Routes, Route, useLocation } from 'react-router-dom'
import { AppShell, Footer, useMantineTheme, Flex } from '@mantine/core'
import Home from './Home'
import TopNav from './TopNav'
import Classes from './Classes'
import Profile from './Profile'
import AdminHome from './AdminHome'
import AdminSubcriptions from './AdminSubscriptions'
import AdminManageMembers from './AdminManageMembers'
import Unauthorized from './Unauthorized'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import MembershipOptions from './MembershipOptions'

interface Links {
  link: string
  label: string
}
function App() {
  const theme = useMantineTheme()
  const { user } = useAuth0()
  const [navLinks, setNavLinks] = useState<Links[] | null>(null)
  const isAdmin = user?.accessRoles.includes('Admin')
  const location = useLocation()

  useEffect(() => {
    if (isAdmin) {
      setNavLinks([
        // TODO Implement these pages
        // { link: '/classes', label: 'CLASSES' },
        // { link: '/myclasses', label: 'MY CLASSES' },
        // { link: '/profile', label: 'PROFILE' },
        { link: '/admin/home', label: 'ADMIN' },
        { link: '/admin/subscriptions', label: 'SUBSCRIPTIONS' },
        { link: '/admin/manage-member', label: 'MANAGE MEMBERS' },
      ])
    } else {
      setNavLinks([
        { link: '/classes', label: 'CLASSES' },
        { link: '/membership-options', label: 'MEMBERSHIP' },
        { link: '/profile', label: 'PROFILE' },
      ])
    }
  }, [isAdmin])

  if (!navLinks) {
    return null
  } else {
    return (
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        footer={
          <Footer height={60} p="md">
            @ClubConnect 2023
          </Footer>
        }
        header={<TopNav links={navLinks} activeLink={location.pathname} />}
      >
        <Flex justify="center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/membership-options" element={<MembershipOptions />} />
            <Route path="/profile" element={<Profile />} />
            {!isAdmin ? (
              <>
                <Route path="/admin/home" element={<Unauthorized />} />
                <Route path="/admin/subscriptions" element={<Unauthorized />} />
                <Route path="/admin/manage-member" element={<Unauthorized />} />
              </>
            ) : (
              <>
                <Route path="/admin/home" element={<AdminHome />} />
                <Route
                  path="/admin/subscriptions"
                  element={<AdminSubcriptions />}
                />
                <Route
                  path="/admin/manage-member"
                  element={<AdminManageMembers />}
                />
              </>
            )}
          </Routes>
        </Flex>
      </AppShell>
    )
  }
}

export default App

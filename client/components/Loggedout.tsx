import { useAuth0 } from '@auth0/auth0-react'
import { Button, Title } from '@mantine/core'
import React from 'react'

function Loggedout() {
  const { loginWithRedirect } = useAuth0()
  return (
    <div className="logged-out-container">
      <Title order={1} className="dashboard-welcome">
        Please Sign In to View This Page! 🔑
      </Title>
      <Button
        className="logged-out-sign-in-button"
        size="lg"
        radius="md"
        onClick={() => {
          loginWithRedirect()
        }}
        color="#78b29c"
      >
        Sign in
      </Button>
    </div>
  )
}

export default Loggedout

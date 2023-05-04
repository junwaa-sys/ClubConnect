import { IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

function LogIn() {
  const { logout, loginWithRedirect, user } = useAuth0()

  function handleSignOut() {
    logout()
  }

  function handleSignIn() {
    loginWithRedirect()
  }

  return (
    <div style={{ width: '80%' }}>
      <button onClick={handleSignOut} color="#78b29c">
        Sign Out
      </button>
      {user && (
        <p>
          Welcome: {user?.name} {user?.email}
        </p>
      )}

      <IfNotAuthenticated>
        <button onClick={handleSignIn} color="#78b29c">
          Sign In
        </button>
      </IfNotAuthenticated>
    </div>
  )
}

export default LogIn

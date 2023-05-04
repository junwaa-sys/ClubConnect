import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Dashboard from './Dashboard'
import Loggedout from './Loggedout'

export default function Home() {
  return (
    <>
      <IfAuthenticated>
        <>
          <Dashboard />
        </>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <>
          <Loggedout />
        </>
      </IfNotAuthenticated>
    </>
  )
}

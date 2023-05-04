import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { useAuth0 } from '@auth0/auth0-react'
import App from '../App'
import { initialiseStore } from '../../store'

jest.mock('@auth0/auth0-react')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const mockToken = 'auth0|123'

describe('<AdminHome />', () => {
  it.todo(
    'should display Top 5 active member based on appearence in checkin db'
  )
  it.todo('should display member list order by expiry date')
  it.todo('should have button to direct to manage member')
  it.todo(
    'should have button to send notification to those member with subscription expiring soon'
  )
})

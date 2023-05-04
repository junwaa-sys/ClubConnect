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

describe('<AdminManageMembers />', () => {
  it.todo('should have a search text box')
  it.todo('should display only search text box when there is no search hit')
  it.todo('should display all member list')
})

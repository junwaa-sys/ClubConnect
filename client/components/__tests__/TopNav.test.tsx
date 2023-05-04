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

describe('<TopNav />', () => {
  it.todo('should display sign in button and Home link without login')
  it.todo('should display all link when user with manager role logged in')
  it.todo('should display links only available to customers')
})

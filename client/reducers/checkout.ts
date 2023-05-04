import { Session } from '../../models/stripe'
import {
  CheckoutSessionAction,
  CHECKOUT_PENDING,
  CHECKOUT_SUCCESS,
  CHECKOUT_ERROR,
} from '../actions/checkout'

interface CheckoutState {
  data: Session | undefined
  error: string | undefined
  loading: boolean
}

const initialState: CheckoutState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const checkoutReducer = (
  state = initialState,
  action: CheckoutSessionAction
): CheckoutState => {
  const { type, payload } = action

  switch (type) {
    case CHECKOUT_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case CHECKOUT_SUCCESS:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case CHECKOUT_ERROR:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default checkoutReducer

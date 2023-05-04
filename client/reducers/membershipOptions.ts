import { Subscription } from '../../models/subscriptions'
import {
  MembershipOptionsAction,
  MEMBERSHIP_OPTIONS_PENDING,
  MEMBERSHIP_OPTIONS_SUCCESS,
  MEMBERSHIP_OPTIONS_ERROR,
} from '../actions/MembershipOptions'

interface MembershipOptionsState {
  data: Subscription[] | undefined
  error: string | undefined
  loading: boolean
}

const initialState: MembershipOptionsState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const membershipOptionsReducer = (
  state = initialState,
  action: MembershipOptionsAction
): MembershipOptionsState => {
  const { type, payload } = action

  switch (type) {
    case MEMBERSHIP_OPTIONS_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case MEMBERSHIP_OPTIONS_SUCCESS:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case MEMBERSHIP_OPTIONS_ERROR:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default membershipOptionsReducer

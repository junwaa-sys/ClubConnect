import { Subscription } from '../../models/subscriptions'
import {
  AdminMembershipOptionsAction,
  ADMIN_MEMBERSHIP_OPTIONS_ERROR,
  ADMIN_MEMBERSHIP_OPTIONS_PENDING,
  ADMIN_MEMBERSHIP_OPTIONS_SUCCESS,
} from '../actions/AdminMembershipOptions'

interface AdminMembershipOptionsState {
  data: Subscription[] | undefined
  error: string | undefined
  loading: boolean
}

const initialState: AdminMembershipOptionsState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const adminMembershipOptionsReducer = (
  state = initialState,
  action: AdminMembershipOptionsAction
): AdminMembershipOptionsState => {
  const { type, payload } = action

  switch (type) {
    case ADMIN_MEMBERSHIP_OPTIONS_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case ADMIN_MEMBERSHIP_OPTIONS_SUCCESS:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case ADMIN_MEMBERSHIP_OPTIONS_ERROR:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default adminMembershipOptionsReducer

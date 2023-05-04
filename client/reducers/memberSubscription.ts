import { MemberProfile } from '../../models/memberSubscription'
import {
  MEMBERS_SUBSCRIPTION_ERROR,
  MEMBERS_SUBSCRIPTION_PENDING,
  MEMBERS_SUBSCRIPTION_SUCCESS,
  MemberSubscriptionAction,
} from '../actions/dashboard'

interface MemberSubscriptionState {
  data: MemberProfile | undefined
  error: string | undefined
  loading: boolean
}

const initialState: MemberSubscriptionState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const memberSubscriptionReducer = (
  state = initialState,
  action: MemberSubscriptionAction
): MemberSubscriptionState => {
  const { type } = action

  switch (type) {
    case MEMBERS_SUBSCRIPTION_PENDING:
      return {
        loading: true,
        error: undefined,
        data: undefined,
      }
    case MEMBERS_SUBSCRIPTION_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      }
    case MEMBERS_SUBSCRIPTION_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: undefined,
      }
    default:
      return state
  }
}

export default memberSubscriptionReducer

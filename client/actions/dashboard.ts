import { ThunkAction } from '../store'
import { MemberSubscription } from '../../models/memberSubscription'
import { getMembersSubscriptionById } from '../apis/dashboard'

export const MEMBERS_SUBSCRIPTION_PENDING = 'FETCH_MEMBERS_SUBSCRIPTION_REQUEST'

export const MEMBERS_SUBSCRIPTION_SUCCESS = 'FETCH_MEMBERS_SUBSCRIPTION_SUCCESS'

export const MEMBERS_SUBSCRIPTION_ERROR = 'FETCH_MEMBERS_SUBSCRIPTION_ERROR'

export type MemberSubscriptionAction =
  | {
      type: typeof MEMBERS_SUBSCRIPTION_PENDING
      payload: null
    }
  | {
      type: typeof MEMBERS_SUBSCRIPTION_SUCCESS
      payload: MemberSubscription
    }
  | {
      type: typeof MEMBERS_SUBSCRIPTION_ERROR
      payload: string
    }

export function memberSubscriptionPending(): MemberSubscriptionAction {
  return {
    type: MEMBERS_SUBSCRIPTION_PENDING,
    payload: null,
  }
}
export function memberSubscriptionSuccess(
  memberSubscription: MemberSubscription
): MemberSubscriptionAction {
  return {
    type: MEMBERS_SUBSCRIPTION_SUCCESS,
    payload: memberSubscription,
  }
}
export function memberSubscriptionError(
  errMessage: string
): MemberSubscriptionAction {
  return {
    type: MEMBERS_SUBSCRIPTION_ERROR,
    payload: errMessage,
  }
}

export function fetchMemberSubscription(id: string): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(memberSubscriptionPending())
      const member = await getMembersSubscriptionById(id)
      dispatch(memberSubscriptionSuccess(member))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(memberSubscriptionError(err.message))
      } else {
        dispatch(memberSubscriptionError('Something went wrong.'))
      }
    }
  }
}

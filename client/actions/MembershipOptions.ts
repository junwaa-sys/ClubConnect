import type { ThunkAction } from '../store'
import api from '../apis/membershipOptions'
import { Subscription } from '../../models/subscriptions'

export const MEMBERSHIP_OPTIONS_PENDING = 'MEMBERSHIP_OPTIONS_PENDING'
export const MEMBERSHIP_OPTIONS_SUCCESS = 'MEMBERSHIP_OPTIONS_SUCCESS'
export const MEMBERSHIP_OPTIONS_ERROR = 'MEMBERSHIP_OPTIONS'

export type MembershipOptionsAction =
  | { type: typeof MEMBERSHIP_OPTIONS_PENDING; payload: void }
  | { type: typeof MEMBERSHIP_OPTIONS_SUCCESS; payload: Subscription[] }
  | { type: typeof MEMBERSHIP_OPTIONS_ERROR; payload: string }

export function membershipOptionsPending(): MembershipOptionsAction {
  return {
    type: MEMBERSHIP_OPTIONS_PENDING,
  } as MembershipOptionsAction
}

export function membershipOptionsSuccess(
  options: Subscription[]
): MembershipOptionsAction {
  return {
    type: MEMBERSHIP_OPTIONS_SUCCESS,
    payload: options,
  }
}

export function membershipOptionsError(
  errorMessage: string
): MembershipOptionsAction {
  return {
    type: MEMBERSHIP_OPTIONS_ERROR,
    payload: errorMessage,
  }
}

export function fetchMembershipOptions(token: string): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(membershipOptionsPending())
      const options = await api.fetchMembershipOptions(token)
      dispatch(membershipOptionsSuccess(options))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(membershipOptionsError(err.message))
      } else {
        dispatch(membershipOptionsError('An unknown error occurred'))
      }
    }
  }
}

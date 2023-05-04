import type { ThunkAction } from '../store'
import api from '../apis/dashboard'
import { CurrentMember } from '../../models/adminManageMember'

export const CURRENT_MEMBER_PENDING = 'REQUEST_ADMIN_MEMBERSHIP_OPTIONS'
export const CURRENT_MEMBER_SUCCESS = 'RECEIVE_ADMIN_MEMBERSHIP_OPTIONS'
export const CURRENT_MEMBER_ERROR = 'FAILURE_ADMIN_MEMBERSHIP_OPTIONS'

export type CurrentMemberAction =
  | { type: typeof CURRENT_MEMBER_PENDING; payload: void }
  | { type: typeof CURRENT_MEMBER_SUCCESS; payload: CurrentMember }
  | { type: typeof CURRENT_MEMBER_ERROR; payload: string }

export function requestCurrentMember(): CurrentMemberAction {
  return {
    type: CURRENT_MEMBER_PENDING,
  } as CurrentMemberAction
}

export function receiveCurrentMember(
  options: CurrentMember
): CurrentMemberAction {
  return {
    type: CURRENT_MEMBER_SUCCESS,
    payload: options,
  }
}

export function failureCurrentMember(
  errorMessage: string
): CurrentMemberAction {
  return {
    type: CURRENT_MEMBER_ERROR,
    payload: errorMessage,
  }
}

export function fetchCurrentMember(token: string): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(requestCurrentMember())
      const profile = await api.fetchCurrentMember(token)
      dispatch(receiveCurrentMember(profile))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(
          failureCurrentMember(
            'There was an error retrieving your profile. Please try again later.'
          )
        )
      } else {
        dispatch(failureCurrentMember('An unknown error occurred'))
      }
    }
  }
}

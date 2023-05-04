import api from '../apis/adminHome'
import { ThunkAction } from '../store'
import * as models from '../../models/adminHome'

export const ACTIVE_MEMBERS_PENDING = 'ACTIVE_MEMBERS_PENDING'
export const ACTIVE_MEMBERS_SUCCESS = 'ACTIVE_MEMBERS_SUCCESS'
export const ACTIVE_MEMBERS_ERROR = 'ACTIVE_MEMBERS_ERROR'

export type GetActiveMembersAction =
  | { type: typeof ACTIVE_MEMBERS_PENDING; payload: void }
  | {
      type: typeof ACTIVE_MEMBERS_SUCCESS
      payload: models.ActiveMembers[]
    }
  | { type: typeof ACTIVE_MEMBERS_ERROR; payload: string }

export function getActiveMembersPending(): GetActiveMembersAction {
  return {
    type: ACTIVE_MEMBERS_PENDING,
  } as GetActiveMembersAction
}

export function getActiveMembersSuccess(
  activeMembers: models.ActiveMembers[]
): GetActiveMembersAction {
  return {
    type: ACTIVE_MEMBERS_SUCCESS,
    payload: activeMembers,
  }
}

export function getAccessLevelRejected(error: string): GetActiveMembersAction {
  return {
    type: ACTIVE_MEMBERS_ERROR,
    payload: error,
  }
}

export function getActiveMembers(token: string): ThunkAction {
  return (dispatch) => {
    dispatch(getActiveMembersPending())
    return api
      .getActivity(token)
      .then((res) => {
        dispatch(getActiveMembersSuccess(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(getAccessLevelRejected(error.message))
        } else {
          dispatch(getAccessLevelRejected('unknown error occured.'))
        }
      })
  }
}

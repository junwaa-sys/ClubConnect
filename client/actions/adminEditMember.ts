import { ThunkAction } from '../store'
import { MemberProfile } from '../../models/memberSubscription'
import { editMemberProfile } from '../apis/adminEditMember'

export const MEMBER_PROFILE_PENDING = 'FETCH_MEMBER_PROFILE_REQUEST'
export const MEMBER_PROFILE_SUCCESS = 'FETCH_MEMBER_PROFILE_SUCCESS'
export const MEMBER_PROFILE_ERROR = 'FETCH_MEMBER_PROFILE_ERROR'

export type MemberProfileAction =
  | {
      type: typeof MEMBER_PROFILE_PENDING
      payload: null
    }
  | {
      type: typeof MEMBER_PROFILE_SUCCESS
      payload: MemberProfile
    }
  | {
      type: typeof MEMBER_PROFILE_ERROR
      payload: string
    }

export function memberProfilePending(): MemberProfileAction {
  return {
    type: MEMBER_PROFILE_PENDING,
    payload: null,
  }
}
export function memberProfileSuccess(
  memberProfile: MemberProfile
): MemberProfileAction {
  return {
    type: MEMBER_PROFILE_SUCCESS,
    payload: memberProfile,
  }
}
export function memberProfileError(errMessage: string): MemberProfileAction {
  return {
    type: MEMBER_PROFILE_ERROR,
    payload: errMessage,
  }
}

export function fetchUpdateMemberProfile(
  id: string,
  memberProfile: MemberProfile
): ThunkAction {
  return (dispatch) => {
    return editMemberProfile(id, memberProfile)
      .then((memberProfile) => {
        dispatch(memberProfileSuccess(memberProfile))
      })
      .catch((err) => {
        dispatch(memberProfileError(err.message))
      })
  }
}

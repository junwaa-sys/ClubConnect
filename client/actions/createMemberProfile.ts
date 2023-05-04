import { ThunkAction } from '../store'
import { MemberProfile } from '../../models/memberSubscription'
import { createMemberProfile } from '../apis/createMemberProfile'

export const CREATE_MEMBER_PROFILE_PENDING = 'CREATE_MEMBER_PROFILE_PENDING'
export const CREATE_MEMBER_PROFILE_SUCCESS = 'CREATE_MEMBER_PROFILE_SUCCESS'
export const CREATE_MEMBER_PROFILE_ERROR = 'CREATE_MEMBER_PROFILE_ERROR'

export type CreateMemberProfileAction =
  | {
      type: typeof CREATE_MEMBER_PROFILE_PENDING
      payload: null
    }
  | {
      type: typeof CREATE_MEMBER_PROFILE_SUCCESS
      payload: MemberProfile
    }
  | {
      type: typeof CREATE_MEMBER_PROFILE_ERROR
      payload: string
    }

export function createMemberProfilePending(): CreateMemberProfileAction {
  return {
    type: CREATE_MEMBER_PROFILE_PENDING,
    payload: null,
  }
}
export function createMemberProfileSuccess(
  memberProfile: MemberProfile
): CreateMemberProfileAction {
  return {
    type: CREATE_MEMBER_PROFILE_SUCCESS,
    payload: memberProfile,
  }
}
export function createMemberProfileError(
  errMessage: string
): CreateMemberProfileAction {
  return {
    type: CREATE_MEMBER_PROFILE_ERROR,
    payload: errMessage,
  }
}

export function fetchCreateMemberProfile(
  memberProfile: MemberProfile
): ThunkAction {
  return (dispatch) => {
    dispatch(createMemberProfilePending())
    return createMemberProfile(memberProfile)
      .then((newMemberProfile) => {
        dispatch(createMemberProfileSuccess(newMemberProfile))
      })
      .catch((err) => {
        dispatch(createMemberProfileError(err.Errmessage))
      })
  }
}

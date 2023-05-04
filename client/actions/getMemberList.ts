import api from '../apis/adminManageMember'
import { ThunkAction } from '../store'
import * as models from '../../models/adminManageMember'

export const MEMBER_LIST_PENDING = 'MEMBER_LIST_PENDING'
export const MEMBER_LIST_SUCCESS = 'MEMBER_LIST_SUCCESS'
export const MEMBER_LIST_ERROR = 'MEMBER_LIST_ERROR'

export type GetMemberListAction =
  | { type: typeof MEMBER_LIST_PENDING; payload: void }
  | {
      type: typeof MEMBER_LIST_SUCCESS
      payload: models.MemberList[]
    }
  | { type: typeof MEMBER_LIST_ERROR; payload: string }

export function getMemberListPending(): GetMemberListAction {
  return {
    type: MEMBER_LIST_PENDING,
  } as GetMemberListAction
}

export function getMemberListFullfilled(
  memberList: models.MemberList[]
): GetMemberListAction {
  return {
    type: MEMBER_LIST_SUCCESS,
    payload: memberList,
  }
}

export function getMemberListRejected(error: string): GetMemberListAction {
  return {
    type: MEMBER_LIST_ERROR,
    payload: error,
  }
}

export function getMemberList(token: string): ThunkAction {
  return (dispatch) => {
    dispatch(getMemberListPending())
    return api
      .getMemberList(token)
      .then((res) => {
        dispatch(getMemberListFullfilled(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(getMemberListRejected(error.message))
        } else {
          dispatch(getMemberListRejected('An unknown error occured.'))
        }
      })
  }
}

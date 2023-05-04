import api from '../apis/adminManageMember'
import { ThunkAction } from '../store'
import * as models from '../../models/adminManageMember'

export const RECORD_CHECKIN_PENDING = 'RECORD_CHECKIN_PENDING'
export const RECORD_CHECKIN_SUCCESS = 'RECORD_CHECKIN_SUCCESS'
export const RECORD_CHECKIN_ERROR = 'RECORD_CHECKIN_ERROR'

export type RecordCheckinAction =
  | { type: typeof RECORD_CHECKIN_PENDING; payload: void }
  | {
      type: typeof RECORD_CHECKIN_SUCCESS
      payload: models.checkedinReturn[]
    }
  | { type: typeof RECORD_CHECKIN_ERROR; payload: string }

export function recordCheckinPending() {
  return {
    type: RECORD_CHECKIN_PENDING,
  } as RecordCheckinAction
}

export function recordCheckinSuccess(
  checkedinRecord: models.checkedinReturn[]
): RecordCheckinAction {
  return {
    type: RECORD_CHECKIN_SUCCESS,
    payload: checkedinRecord,
  }
}

export function recordCheckinError(error: string): RecordCheckinAction {
  return {
    type: RECORD_CHECKIN_ERROR,
    payload: error,
  }
}

export function recordCheckin(
  token: string,
  memberDetails: models.MemberList,
  currentDate: string
): ThunkAction {
  return (dispatch) => {
    dispatch(recordCheckinPending())
    return api
      .recordCheckin(token, memberDetails, currentDate)
      .then((res) => {
        dispatch(recordCheckinSuccess(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(recordCheckinError(error.message))
        } else {
          dispatch(
            recordCheckinError(
              'An unknown error occured while recording checkin.'
            )
          )
        }
      })
  }
}

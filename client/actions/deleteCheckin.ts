import api from '../apis/adminManageMember'
import { ThunkAction } from '../store'
import * as models from '../../models/adminManageMember'

export const DELETE_CHECKIN_PENDING = 'DELETE_CHECKIN_PENDING'
export const DELETE_CHECKIN_SUCCESS = 'DELETE_CHECKIN_SUCCESS'
export const DELETE_CHECKIN_ERROR = 'DELETE_CHECKIN_ERROR'

export type DeleteCheckinAction =
  | { type: typeof DELETE_CHECKIN_PENDING; payload: void }
  | {
      type: typeof DELETE_CHECKIN_SUCCESS
      payload: models.deleteCheckinReturn[]
    }
  | { type: typeof DELETE_CHECKIN_ERROR; payload: string }

export function deleteCheckinPending() {
  return {
    type: DELETE_CHECKIN_PENDING,
  } as DeleteCheckinAction
}

export function deleteCheckinSuccess(
  checkedinRecord: models.deleteCheckinReturn[]
): DeleteCheckinAction {
  return {
    type: DELETE_CHECKIN_SUCCESS,
    payload: checkedinRecord,
  }
}

export function deleteCheckinError(error: string): DeleteCheckinAction {
  return {
    type: DELETE_CHECKIN_ERROR,
    payload: error,
  }
}

export function deleteCheckin(
  token: string,
  checkinId: { id: number }
): ThunkAction {
  return (dispatch) => {
    dispatch(deleteCheckinPending())
    return api
      .deleteCheckin(token, checkinId)
      .then((res) => {
        dispatch(deleteCheckinSuccess(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(deleteCheckinError(error.message))
        } else {
          dispatch(deleteCheckinError('An unknown error occured.'))
        }
      })
  }
}

import api from '../apis/adminHome'
import { ThunkAction } from '../store'
import * as models from '../../models/adminHome'

export const EXPIRY_DATES_PENDING = 'EXPIRY_DATE_PENDING'
export const EXPIRY_DATES_SUCCESS = 'EXPIRY_DATE_SUCCESS'
export const EXPIRY_DATES_ERROR = 'EXPIRY_DATE_REJECTED'

export type GetExpiryDatesAction =
  | { type: typeof EXPIRY_DATES_PENDING; payload: void }
  | {
      type: typeof EXPIRY_DATES_SUCCESS
      payload: models.ExpiryDateList[]
    }
  | { type: typeof EXPIRY_DATES_ERROR; payload: string }

export function getExpiryDatesPending(): GetExpiryDatesAction {
  return {
    type: EXPIRY_DATES_PENDING,
  } as GetExpiryDatesAction
}

export function getExpiryDatesFullfilled(
  expiryDates: models.ExpiryDateList[]
): GetExpiryDatesAction {
  return {
    type: EXPIRY_DATES_SUCCESS,
    payload: expiryDates,
  }
}

export function getExpiryDatesRejected(error: string): GetExpiryDatesAction {
  return {
    type: EXPIRY_DATES_ERROR,
    payload: error,
  }
}

export function getExpiryDates(token: string): ThunkAction {
  return (dispatch) => {
    dispatch(getExpiryDatesPending())
    return api
      .getExpiryDates(token)
      .then((res) => {
        dispatch(getExpiryDatesFullfilled(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(getExpiryDatesRejected(error.message))
        } else {
          dispatch(getExpiryDatesRejected('An unknown error occured.'))
        }
      })
  }
}

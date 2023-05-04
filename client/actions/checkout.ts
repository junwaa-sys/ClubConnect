import type { ThunkAction } from '../store'
import api from '../apis/checkout'
import { Session } from '../../models/stripe'

export const CHECKOUT_PENDING = 'CHECKOUT_PENDING'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const CHECKOUT_ERROR = 'CHECKOUT_ERROR'

export type CheckoutSessionAction =
  | { type: typeof CHECKOUT_PENDING; payload: void }
  | { type: typeof CHECKOUT_SUCCESS; payload: Session }
  | { type: typeof CHECKOUT_ERROR; payload: string }

export function checkoutSessionPending(): CheckoutSessionAction {
  return {
    type: CHECKOUT_PENDING,
  } as CheckoutSessionAction
}

export function checkoutSessionSuccess(
  session: Session
): CheckoutSessionAction {
  return {
    type: CHECKOUT_SUCCESS,
    payload: session,
  }
}

export function checkoutSessionError(
  errorMessage: string
): CheckoutSessionAction {
  return {
    type: CHECKOUT_ERROR,
    payload: errorMessage,
  }
}

export function initiateCheckoutSession(
  subscriptionId: number,
  memberId: string | undefined,
  token: string
): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(checkoutSessionPending())
      const session = await api.initiateCheckoutSession(
        subscriptionId,
        memberId,
        token
      )
      dispatch(checkoutSessionSuccess(session))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(
          checkoutSessionError('Something went wrong. Please try again later.')
        )
      } else {
        dispatch(
          checkoutSessionError('Something went wrong. Please try again later.')
        )
      }
    }
  }
}

export function initiateCheckoutPortal(
  subscriptionId: number,
  memberId: string | undefined,
  token: string
): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(checkoutSessionPending())
      const session = await api.initiateCheckoutPortal(subscriptionId, token)
      dispatch(checkoutSessionSuccess(session))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(
          checkoutSessionError('Something went wrong. Please try again later.')
        )
      } else {
        dispatch(
          checkoutSessionError('Something went wrong. Please try again later.')
        )
      }
    }
  }
}

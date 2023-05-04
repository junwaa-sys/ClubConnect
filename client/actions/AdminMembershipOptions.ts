import type { ThunkAction } from '../store'
import api from '../apis/membershipOptions'
import { Subscription } from '../../models/subscriptions'

export const ADMIN_MEMBERSHIP_OPTIONS_PENDING =
  'ADMIN_MEMBERSHIP_OPTIONS_PENDING'
export const ADMIN_MEMBERSHIP_OPTIONS_SUCCESS =
  'ADMIN_MEMBERSHIP_OPTIONS_SUCCESS'
export const ADMIN_MEMBERSHIP_OPTIONS_ERROR = 'ADMIN_MEMBERSHIP_OPTIONS_ERROR'

export type AdminMembershipOptionsAction =
  | { type: typeof ADMIN_MEMBERSHIP_OPTIONS_PENDING; payload: void }
  | { type: typeof ADMIN_MEMBERSHIP_OPTIONS_SUCCESS; payload: Subscription[] }
  | { type: typeof ADMIN_MEMBERSHIP_OPTIONS_ERROR; payload: string }

export function membershipOptionsPending(): AdminMembershipOptionsAction {
  return {
    type: ADMIN_MEMBERSHIP_OPTIONS_PENDING,
  } as AdminMembershipOptionsAction
}

export function membershipOptionsSuccess(
  options: Subscription[]
): AdminMembershipOptionsAction {
  return {
    type: ADMIN_MEMBERSHIP_OPTIONS_SUCCESS,
    payload: options,
  }
}

export function membershipOptionsError(
  errorMessage: string
): AdminMembershipOptionsAction {
  return {
    type: ADMIN_MEMBERSHIP_OPTIONS_ERROR,
    payload: errorMessage,
  }
}

export function fetchAllMembershipOptions(token: string): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(membershipOptionsPending())
      const options = await api.fetchAllMembershipOptions(token)
      dispatch(membershipOptionsSuccess(options))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(
          membershipOptionsError(
            'There was an error retrieving membership options. Please try again later.'
          )
        )
      } else {
        dispatch(membershipOptionsError('An unknown error occurred'))
      }
    }
  }
}

export function addMembershipOption(
  formData: Partial<Subscription>,
  token: string
): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(membershipOptionsPending())

      const options =
        formData.id === 0
          ? await api.addMembershipOption(formData, token)
          : await api.updateMembershipOption(formData, token)
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

export function archiveMembershipOption(
  id: number,
  token: string
): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(membershipOptionsPending())
      const options = await api.archiveMembershipOption(id, token)
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
export function restoreMembershipOption(
  id: number,
  token: string
): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(membershipOptionsPending())
      const options = await api.restoreMembershipOption(id, token)
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

export function deleteMembershipOption(id: number, token: string): ThunkAction {
  return async (dispatch) => {
    try {
      dispatch(membershipOptionsPending())
      const options = await api.deleteMembershipOption(id, token)
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

import {
  CurrentMemberAction,
  CURRENT_MEMBER_PENDING,
  CURRENT_MEMBER_SUCCESS,
  CURRENT_MEMBER_ERROR,
} from '../actions/currentMember'

import * as models from '../../models/adminManageMember'

interface CurrentMemberState {
  data: models.CurrentMember | null
  error: string | null
  loading: boolean
}

const initialState: CurrentMemberState = {
  data: null,
  error: null,
  loading: false,
}

export default function CurrentMemberReducer(
  state = initialState,
  action: CurrentMemberAction
): CurrentMemberState {
  const { type, payload } = action
  switch (type) {
    default:
      return state

    case CURRENT_MEMBER_PENDING:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case CURRENT_MEMBER_SUCCESS:
      return {
        data: payload,
        error: null,
        loading: false,
      }

    case CURRENT_MEMBER_ERROR:
      return {
        data: null,
        error: payload,
        loading: false,
      }
  }
}

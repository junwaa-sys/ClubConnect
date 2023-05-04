import {
  GetActiveMembersAction,
  ACTIVE_MEMBERS_PENDING,
  ACTIVE_MEMBERS_SUCCESS,
  ACTIVE_MEMBERS_ERROR,
} from '../actions/getActiveMember'
import * as models from '../../models/adminHome'

interface GetActiveMemberState {
  data: models.ActiveMembers[] | null
  error: string | null
  loading: boolean
}

const initialState: GetActiveMemberState = {
  data: null,
  error: null,
  loading: false,
}

const getActiveMembersReducer = (
  state = initialState,
  action: GetActiveMembersAction
): GetActiveMemberState => {
  const { type, payload } = action
  switch (type) {
    case ACTIVE_MEMBERS_PENDING:
      return {
        data: null,
        error: null,
        loading: false,
      }

    case ACTIVE_MEMBERS_SUCCESS:
      return {
        data: payload,
        error: null,
        loading: false,
      }

    case ACTIVE_MEMBERS_ERROR:
      return {
        data: null,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export default getActiveMembersReducer

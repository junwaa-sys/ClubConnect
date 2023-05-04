import {
  GetMemberListAction,
  MEMBER_LIST_PENDING,
  MEMBER_LIST_SUCCESS,
  MEMBER_LIST_ERROR,
} from '../actions/getMemberList'
import * as models from '../../models/adminManageMember'

interface GetMemberListState {
  data: models.MemberList[] | null
  error: string | null
  loading: boolean
}

const initialState: GetMemberListState = {
  data: null,
  error: null,
  loading: false,
}

const getMemberListReducer = (
  state = initialState,
  action: GetMemberListAction
): GetMemberListState => {
  const { type, payload } = action
  switch (type) {
    case MEMBER_LIST_PENDING:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case MEMBER_LIST_SUCCESS:
      return {
        data: payload,
        error: null,
        loading: false,
      }

    case MEMBER_LIST_ERROR:
      return {
        data: null,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export default getMemberListReducer

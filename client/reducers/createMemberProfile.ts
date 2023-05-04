import { MemberProfile } from '../../models/memberSubscription'
import {
  CREATE_MEMBER_PROFILE_ERROR,
  CREATE_MEMBER_PROFILE_PENDING,
  CREATE_MEMBER_PROFILE_SUCCESS,
  CreateMemberProfileAction,
} from '../actions/createMemberProfile'

interface MemberProfileState {
  data: MemberProfile | undefined
  error: string | undefined
  loading: boolean
}

const initialState: MemberProfileState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const createMemberProfileReducer = (
  state = initialState,
  action: CreateMemberProfileAction
): MemberProfileState => {
  const { type } = action

  switch (type) {
    case CREATE_MEMBER_PROFILE_PENDING:
      return {
        loading: true,
        error: undefined,
        data: undefined,
      }
    case CREATE_MEMBER_PROFILE_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      }
    case CREATE_MEMBER_PROFILE_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: undefined,
      }
    default:
      return state
  }
}

export default createMemberProfileReducer

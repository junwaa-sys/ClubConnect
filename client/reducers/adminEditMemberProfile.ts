import { MemberProfile } from '../../models/memberSubscription'
import {
  MEMBER_PROFILE_ERROR,
  MEMBER_PROFILE_PENDING,
  MEMBER_PROFILE_SUCCESS,
  MemberProfileAction,
} from '../actions/adminEditMember'

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

const memberEditProfileReducer = (
  state = initialState,
  action: MemberProfileAction
): MemberProfileState => {
  const { type } = action

  switch (type) {
    case MEMBER_PROFILE_PENDING:
      return {
        loading: true,
        error: undefined,
        data: undefined,
      }
    case MEMBER_PROFILE_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      }
    case MEMBER_PROFILE_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: undefined,
      }
    default:
      return state
  }
}

export default memberEditProfileReducer

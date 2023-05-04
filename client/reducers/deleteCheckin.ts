import {
  DeleteCheckinAction,
  DELETE_CHECKIN_PENDING,
  DELETE_CHECKIN_SUCCESS,
  DELETE_CHECKIN_ERROR,
} from '../actions/deleteCheckin'

import * as models from '../../models/adminManageMember'

interface DeleteCheckinState {
  data: models.deleteCheckinReturn | null
  error: string | null
  loading: boolean
}

const initialState: DeleteCheckinState = {
  data: null,
  error: null,
  loading: false,
}

export default function deleteCheckinReducer(
  state = initialState,
  action: DeleteCheckinAction
): DeleteCheckinState {
  const { type, payload } = action
  switch (type) {
    default:
      return state

    case DELETE_CHECKIN_PENDING:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case DELETE_CHECKIN_SUCCESS:
      return {
        data: null,
        error: null,
        loading: false,
      }

    case DELETE_CHECKIN_ERROR:
      return {
        data: null,
        error: payload,
        loading: false,
      }
  }
}

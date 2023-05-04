import {
  RecordCheckinAction,
  RECORD_CHECKIN_PENDING,
  RECORD_CHECKIN_SUCCESS,
  RECORD_CHECKIN_ERROR,
} from '../actions/recordCheckin'
import * as models from '../../models/adminManageMember'

interface RecordCheckinState {
  data: models.checkedinReturn[] | null
  error: string | null
  loading: boolean
}

const initialState: RecordCheckinState = {
  data: null,
  error: null,
  loading: false,
}

function recordCheckinReducer(
  state = initialState,
  action: RecordCheckinAction
): RecordCheckinState {
  const { type, payload } = action
  switch (type) {
    case RECORD_CHECKIN_PENDING:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case RECORD_CHECKIN_SUCCESS:
      return {
        data: payload,
        error: null,
        loading: false,
      }

    case RECORD_CHECKIN_ERROR:
      return {
        data: null,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export default recordCheckinReducer

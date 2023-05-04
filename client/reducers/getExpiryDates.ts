import {
  GetExpiryDatesAction,
  EXPIRY_DATES_PENDING,
  EXPIRY_DATES_SUCCESS,
  EXPIRY_DATES_ERROR,
} from '../actions/getExpiryList'
import * as models from '../../models/adminHome'

interface GetExpiryDatesState {
  data: models.ExpiryDateList[] | null
  error: string | null
  loading: boolean
}

const initialState: GetExpiryDatesState = {
  data: null,
  error: null,
  loading: false,
}

const getExpiryDatesReducer = (
  state = initialState,
  action: GetExpiryDatesAction
): GetExpiryDatesState => {
  const { type, payload } = action

  switch (type) {
    case EXPIRY_DATES_PENDING:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case EXPIRY_DATES_SUCCESS:
      return {
        data: payload,
        error: null,
        loading: false,
      }

    case EXPIRY_DATES_ERROR:
      return {
        data: null,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export default getExpiryDatesReducer

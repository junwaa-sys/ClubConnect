import { combineReducers } from 'redux'
import memberSubscriptionReducer from './memberSubscription'
import getActiveMembersReducer from './getActiveMember'
import checkoutReducer from './checkout'
import membershipOptionsReducer from './membershipOptions'
import adminMembershipOptionsReducer from './adminMembershipOptions'
import createMemberProfileReducer from './createMemberProfile'
import getExpiryDatesReducer from './getExpiryDates'
import getMemberListReducer from './getMemberList'
import memberEditProfileReducer from './adminEditMemberProfile'
import recordCheckinReducer from './recordCheckin'
import deleteCheckinReducer from './deleteCheckin'
import CurrentMemberReducer from './currentMember'

export default combineReducers({
  memberSubscription: memberSubscriptionReducer,
  checkout: checkoutReducer,
  getActiveMember: getActiveMembersReducer,
  membershipOptions: membershipOptionsReducer,
  adminMembershipOptions: adminMembershipOptionsReducer,
  createMemberProfile: createMemberProfileReducer,
  getExpiryDates: getExpiryDatesReducer,
  getMemberList: getMemberListReducer,
  editMemberProfile: memberEditProfileReducer,
  recordCheckin: recordCheckinReducer,
  deleteCheckin: deleteCheckinReducer,
  currentMember: CurrentMemberReducer,
})

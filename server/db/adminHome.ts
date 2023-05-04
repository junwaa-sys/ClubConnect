import connection from './connection'
import * as models from '../../models/adminHome'
const currenDate = new Date(Date.now())
const formattedDateAWeekAfter = `${currenDate.getFullYear()}-${(
  currenDate.getMonth() + 1
)
  .toString()
  .padStart(2, '0')}-${(currenDate.getDate() + 7).toString().padStart(2, '0')}`

async function getActivity(db = connection): Promise<models.ActiveMembers[]> {
  return (await db('checkins')
    .join('member_profiles', 'member_profiles.id', '=', 'checkins.member_id')
    .join(
      'member_subscriptions',
      'member_subscriptions.member_id',
      '=',
      'member_profiles.auth0_id'
    )
    .join(
      'subscriptions',
      'subscriptions.id',
      '=',
      'member_subscriptions.subscriptions_id'
    )
    .select(
      'member_profiles.id as memberId',
      'member_profiles.name as memberName',
      'subscriptions.name as subscriptionsName',
      'member_subscriptions.renewal_date as renewalDate',
      'member_subscriptions.concession_qty as concessionQty'
    )
    .count('member_profiles.id as count')
    .groupBy('member_profiles.id')
    .orderBy('count', 'desc')) as unknown[] as models.ActiveMembers[]
}

function getExpiryDates(db = connection): Promise<models.ExpiryDateList[]> {
  const aWeekAgo = new Date()
  aWeekAgo.setDate(aWeekAgo.getDate() - 7)

  return db('member_subscriptions')
    .join(
      'member_profiles',
      'member_subscriptions.member_id',
      '=',
      'member_profiles.auth0_id'
    )
    .select(
      'member_profiles.id as memberId',
      'member_profiles.email as memberEmail',
      'member_profiles.name as memberName',
      'member_subscriptions.renewal_date as renewalDate',
      'member_subscriptions.concession_qty as concessionQty'
    )
    .where('member_subscriptions.renewal_date', '<=', formattedDateAWeekAfter)
    .orderBy('renewalDate', 'asc')
}

export default { getActivity, getExpiryDates }

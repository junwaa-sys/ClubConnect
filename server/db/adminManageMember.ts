import * as models from '../../models/adminManageMember'
import connection from './connection'
const currenDate = new Date()
const formattedDate = `${currenDate.getFullYear()}-${(currenDate.getMonth() + 1)
  .toString()
  .padStart(2, '0')}-${currenDate.getDate().toString().padStart(2, '0')}`

function getMemberList(db = connection): Promise<models.MemberList[]> {
  return db
    .with(
      'valid_subscription',
      db.raw(
        `select *,CAST(SUBSTR("valid_to",1,4) AS int) as year , 
        CAST(SUBSTR("valid_to",6,2) AS int) as month, 
        CAST(SUBSTR("valid_to",9,2) AS int) as day 
        from "member_subscriptions" 
        where payment_status = "paid"  and concession_qty > 0 and year >= ${currenDate.getFullYear()} and month >= ${
          currenDate.getMonth() + 1
        } and day >= ${currenDate.getDate()}`
      )
    )
    .with(
      'checkin_today',
      db.raw(
        'select *  from "checkins" where "checkedin_date" = ?',
        formattedDate
      )
    )
    .select(
      'member_profiles.id as memberId',
      'member_profiles.auth0_id as auth0Id',
      'member_profiles.name as memberName',
      'member_profiles.address as memberAddress',
      'member_profiles.phone as memberPhone',
      'member_profiles.emergency_contact_name as emergencyContact',
      'member_profiles.emergency_contact_phone as emergencyPhone',
      'member_profiles.email as memberEmail',
      'valid_subscription.concession_qty as concessionQty',
      'valid_subscription.valid_to as validTo',
      'valid_subscription.id as subscriptionId',
      'subscriptions.name as subscriptionName',
      'checkin_today.checkedin_date as createdAt',
      'checkin_today.id as checkinId'
    )
    .from('member_profiles')
    .leftJoin('checkin_today', 'member_profiles.id', 'checkin_today.member_id')
    .leftJoin(
      'valid_subscription',
      'member_profiles.stripe_id',
      'valid_subscription.member_id'
    )
    .leftJoin(
      'subscriptions',
      'subscriptions.id',
      'valid_subscription.subscriptions_id'
    )
    .orderBy('member_profiles.id')
}

async function recordCheckin(
  memberDetails: models.MemberList,
  auth0Id: string,
  db = connection
): Promise<models.checkedinReturn[]> {
  const subscriptionDatas = await db('member_subscriptions')
    .join(
      'subscriptions',
      'subscriptions.id',
      'member_subscriptions.subscriptions_id'
    )
    .select(
      'member_subscriptions.id as subscriptionsId',
      'member_subscriptions.concession_qty as concessionQty',
      'subscriptions.cover_period as coverPeriod'
    )
    .where('subscriptionsId', memberDetails.subscriptionId)
    .first()

  const newConcessionQty = subscriptionDatas.concessionQty - 1

  await db('member_subscriptions')
    .update({ concession_qty: newConcessionQty })
    .where('id', memberDetails.subscriptionId)
  return db('checkins')
    .insert({
      member_id: memberDetails.memberId,
      checkedin_date: formattedDate,
    })
    .returning(['id', 'checkedin_date'])
}

function deleteCheckin(checkinId: number, db = connection) {
  return db('checkins').delete().where('id', checkinId)
}

export default { getMemberList, recordCheckin, deleteCheckin }

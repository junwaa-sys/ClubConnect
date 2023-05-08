import connection from './connection'

import {
  MemberProfile,
  MemberSubscription,
} from '../../models/memberSubscription'

export async function getMembersSubscriptionById(
  id: string | undefined,
  db = connection
): Promise<MemberSubscription> {
  return (
    db('member_profiles')
      .leftJoin(
        'member_subscriptions',
        'member_subscriptions.member_id',
        'member_profiles.stripe_id'
      )
      .leftJoin(
        'subscriptions',
        'member_subscriptions.subscriptions_id',
        'subscriptions.id'
      )
      .select(
        'member_subscriptions.member_id as memberId',
        'member_subscriptions.payment_reference as paymentReference',
        'member_subscriptions.payment_status as paymentStatus',
        'member_subscriptions.renewal_date as renewalDate',
        'member_subscriptions.updated_at as updatedAt',
        'member_subscriptions.valid_from as validFrom',
        'member_subscriptions.valid_to as validTo',
        'member_subscriptions.concession_qty as concessionQty',
        'subscriptions.name as subscriptionName',
        'subscriptions.price as subscriptionPrice',
        'subscriptions.id as subscriptionId',
        'member_profiles.name as memberName',
        'member_profiles.auth0_id as auth0id',
        'member_profiles.address',
        'member_profiles.emergency_contact_name as emergencyContactName',
        'member_profiles.emergency_contact_phone as emergencyContactPhone',
        'member_profiles.phone',
        'member_profiles.email as memberEmail',
        'member_profiles.stripe_id as stripeId'
      )
      // .where('member_profiles.auth0_id', id)
      // .orWhere('member_profiles.stripe_id', id)
      .first()
  )
}

export async function createMemberProfile(
  memberProfile: MemberProfile,
  db = connection
) {
  const existingMember = await db('member_profiles')
    .where('auth0_id', memberProfile.auth0_id)
    .first()
  if (!existingMember) {
    await db('member_profiles').insert(memberProfile)
  }
}

export async function getCurrentMember(
  auth0Id: string | undefined,
  db = connection
) {
  return db('member_profiles')
    .leftJoin(
      'member_subscriptions',
      'member_profiles.stripe_id',
      '=',
      'member_subscriptions.member_id'
    )
    .fullOuterJoin(
      'subscriptions',
      'member_subscriptions.subscriptions_id',
      '=',
      'subscriptions.id'
    )
    .select(
      'member_profiles.name',
      'subscriptions.id as subscriptionId',
      'subscriptions.name as subscriptionName',
      'subscriptions.cover_period',
      'member_subscriptions.concession_qty',
      'subscriptions.price',
      'member_subscriptions.renewal_date',
      'member_profiles.stripe_id'
    )
    .where('member_profiles.auth0_id', auth0Id)
    .first()
}

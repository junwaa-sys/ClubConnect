export interface MemberSubscription {
  auth0id?: string
  memberEmail?: string
  id: number
  memberId: number
  subscriptionsId: number
  concessionQty: number
  validFrom: string
  validTo: string
  renewalDate: string
  paymentReference: string
  paymentStatus: string
  createdAt: string
  updatedAt: string
  memberName: string
  subscriptionName: string
  subscriptionPrice: number
  stripe_id?: string
  stripeId: string
}

export interface MemberProfile {
  auth0_id?: string
  auth0id?: string
  auth0Id?: string
  memberName?: string
  name?: string
  memberEmail?: string
  email?: string
  phone?: number
  address?: string
  emergency_contact_name?: string
  emergency_contact_phone?: number
  emergencyContactName?: string
  emergencyContactPhone?: number
  paymentStatus?: string
  subscriptionName?: string
  subscriptionPrice?: number
  validFrom?: Date | string
  validTo?: Date | string
  renewalDate?: Date | string
}

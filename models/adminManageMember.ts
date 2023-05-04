export interface MemberList {
  memberId: number
  auth0Id: string
  memberName: string
  memberAddress: string
  memberPhone: string
  emergencyContact: string
  emergencyPhone: string
  memberEmail: string
  subscriptionName: string
  concessionQty: number
  renewalDate: string
  createdAt: string
  checkinId: number
  subscriptionId: number
  validTo: string
}

export interface CurrentMember {
  concession_qty: number
  cover_period: string
  name: string
  price: number
  renewal_date: string
  stripe_id: string
  subscriptionId: number
  subscriptionName: string
}

export interface checkedinReturn {
  id: number
  created_at: Date
}

export interface deleteCheckinReturn {
  id: number
}

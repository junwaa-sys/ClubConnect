export interface Subscription {
  id: number
  name: string
  cover_period: string
  is_published: boolean
  price: number | ''
  stripe_product: string
  stripe_price: string
  is_active: boolean
  default_concessions: number | ''
  archived: boolean
}

export interface PendingSubscription {
  memberId: string | undefined
  subscriptionId: number
  payment_status: string
}

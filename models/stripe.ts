import { Hash } from 'react-router-dom'

export interface StripeProduct {
  id: string
  object: string
  active: boolean
  created: EpochTimeStamp
  default_price: string
  description: string
  images: string[]
  livemode: boolean
  metadata: Metadata
  name: string
  package_dimensions: Hash
  shippable: boolean
  statement_descriptor: string
  tax_code: string
  type: string
  unit_label: string
  updated: number
  url: string
}

export interface StripePrice {
  id: string
  object: string
  active: boolean
  billing_scheme: string
  created: EpochTimeStamp
  currency: string
  custom_unit_amount: Hash
  livemode: boolean
  lookup_key: string
  metadata: Metadata
  nickname: string
  product: string
  recurring: Recurring
  tax_behavior: string
  tiers_mode: string
  transform_quantity: Hash
  type: string
  unit_amount: number
  unit_amount_decimal: string
}

export interface Recurring {
  aggregate_usage: boolean
  interval: string
  interval_count: number
  usage_type: string
}

export interface Metadata {}

export interface Session {
  id: string
  object: string
  configuration: string
  created: Date
  customer: string
  flow: string
  livemode: boolean
  locale: string
  on_behalf_of: string
  return_url: string
  url: string
}

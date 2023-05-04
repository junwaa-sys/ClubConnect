export interface ExpiryDateList {
  memberId: number
  memberName: string
  renewalDate: string
  concessionQty: number
  memberEmail: string
}

export interface ActiveMembers {
  memberId: number
  memberName: string
  subscriptionsName: string
  renewalDate: string
  concessionQty: number
  count: number
}
export interface EmailBody {
  email: string
  subject: string
  content: string
}

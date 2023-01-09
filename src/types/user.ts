export interface IUser {
  birthday: string
  block_matches_until: string
  created_at: string
  current_team_id: null | string
  deleted_at: null | string
  document: string
  email: string
  email_verified_at: string
  expires_at: null | string
  id: number
  is_admin: boolean
  is_blocked: boolean
  is_recipient: number
  is_subscriber: boolean
  is_validated: boolean
  name: string
  note: null | string
  profile_photo_path: string
  promotion: boolean
  updated_at: string
}

export interface IOpportunities {
  cart_id: number
  code: string
  expires_at: string
  miles: {
    miles_logo: string
    miles_money: number
    miles_program: string
    miles_up_to: number
  }
  now_prices: {
    americanas: number
    casabahia: number
    magazineluiza: number
    pontofrio: number
  }
  order_id: number
  price: number
  product: {
    color: string
    memory: string
    name: string
    photo: string
  }
  translated_expires_at: string
  will_receive: number
}

export interface IOrder {
  cart_id: number
  code: string
  date: string
  invoice_id: number
  order_id: number
  price: number
  product: {
    color: string
    memory: string
    name: string
  }
  will_receive: number
}

export interface IDashboard {
  analyzing: number
  completed: number
  done: number
  reserved: number
}

export interface ICreatePaymentMethod {
  number: string;
  expiration: string;
  cvv: string;
  user_id: number;
}

export interface ICreateLinkedBankAccount {
  user_id: number;
  routing: string;
  account_number: string;
  name: string;
}

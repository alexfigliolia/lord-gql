export interface ICreatePayment {
  unit_id: number;
  property_id: number;
  description: string;
  organization_id: number;
  amount: number;
  user_id: number;
}

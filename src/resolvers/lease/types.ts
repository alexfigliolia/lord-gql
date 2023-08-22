export interface LeaseQueryArgs {
  id?: number;
  unit_id?: number;
}

export interface CreateLeaseArgs {
  unit_id: number;
  amount: number;
  start_date: string;
  end_date: string;
  users: number[];
  property_id: number;
  organization_id: number;
}

export interface PropertyQueryArgs {
  id?: number;
  organization_id?: number;
}

export interface ICreateProperty {
  organization_id: number;
  name: string;
  description: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
}

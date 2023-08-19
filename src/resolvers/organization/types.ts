export interface OrgByID {
  id: number;
}

export interface OrgByOwner {
  owner_id: number;
}

export interface OrgByAffiliation {
  user_id: number;
}

export interface ICreateOrg {
  name: string;
  owner_id: number;
}

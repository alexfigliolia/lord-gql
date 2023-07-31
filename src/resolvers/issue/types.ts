export interface IssueQueryArgs {
  id?: number;
  unit_id?: number;
  organization_id?: number;
  assigned_id?: number;
}

export interface ICreateIssue {
  title: string;
  author: string;
  description: string;
  unit_id?: number;
  property_id: number;
  organization_id: number;
  assigned_id?: number;
  status: IssueStatus;
  type: IssueType;
}

export interface IIssueStatus {
  id: number;
  status: IssueStatus;
}

export interface IAssignIssue {
  user_id: number;
  issue_id: number;
}

enum IssueType {
  complaint = "complaint",
  fix = "fix",
  consultation = "consultation",
}

enum IssueStatus {
  complete = "complete",
  open = "open",
  inprogress = "inprogress",
}

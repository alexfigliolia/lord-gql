export enum ExpenseType {
  labor = "labor",
  hardware = "hardware",
  management = "management",
}

export interface IExpenses {
  search?: string;
  property_id?: number;
  organization_id?: number;
  category?: ExpenseType;
}

export interface ICreateExpense {
  property_id: number;
  organization_id: number;
  category: ExpenseType;
  description: string;
  amount: number;
}

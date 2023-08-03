import { DB } from "db/Client";
import type { ExpenseType, ICreateExpense, IExpenses } from "./types";
import { GraphQLError } from "graphql";

export class ExpenseController {
  public static routeQuery({
    property_id,
    organization_id,
    category,
    search,
  }: IExpenses) {
    if (typeof property_id === "number") {
      return this.queryByPropertyID(property_id, search, category);
    }
    if (typeof organization_id === "number") {
      return this.queryByOrganizationID(organization_id, search, category);
    }
    throw new GraphQLError(
      "A property_id or organization_id is required when querying expenses"
    );
  }

  public static createExpense(args: ICreateExpense) {
    return DB.expense.create({ data: args });
  }

  private static queryByPropertyID(
    id: number,
    search?: string,
    category?: ExpenseType
  ) {
    return DB.expense.findMany({
      where: {
        property_id: id,
        ...this.withSearch(search),
        ...this.withCategory(category),
      },
    });
  }

  private static queryByOrganizationID(
    id: number,
    search?: string,
    category?: ExpenseType
  ) {
    return DB.expense.findMany({
      where: {
        organization_id: id,
        ...this.withSearch(search),
        ...this.withCategory(category),
      },
    });
  }

  private static withSearch(search?: string) {
    if (!search) {
      return;
    }
    return {
      description: {
        contains: search?.toLowerCase(),
      },
    };
  }

  private static withCategory(category?: ExpenseType) {
    if (!category) {
      return;
    }
    return {
      category,
    };
  }
}

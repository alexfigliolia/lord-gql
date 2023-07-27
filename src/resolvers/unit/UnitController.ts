import { DB } from "db/Client";
import type { UnitQueryArgs } from "./types";
import { GraphQLError } from "graphql";

export class UnitController {
  public static routeQuery({ property_id, id }: UnitQueryArgs) {
    if (typeof id === "number") {
      return this.queryByID(id);
    }
    if (typeof property_id === "number") {
      return this.queryByPropertyID(property_id);
    }
    throw new GraphQLError("Units must be queried by ID");
  }

  public static queryByPropertyID(ID: number) {
    return DB.unit.findMany({
      where: {
        property_id: ID,
      },
    });
  }

  public static queryByID(ID: number) {
    return DB.unit.findUnique({
      where: {
        id: ID,
      },
    });
  }
}

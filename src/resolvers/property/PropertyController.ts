import { DB } from "db/Client";
import type { PropertyQueryArgs } from "./types";
import { GraphQLError } from "graphql";

export class PropertyController {
  public static routeQuery({ organization_id, id }: PropertyQueryArgs) {
    if (typeof id === "number") {
      return this.queryByID(id);
    }
    if (typeof organization_id === "number") {
      return this.queryByOrganizationID(organization_id);
    }
    throw new GraphQLError("Properties must be queried by ID");
  }

  public static queryByOrganizationID(ID: number) {
    return DB.property.findMany({
      where: {
        organization_id: ID,
      },
    });
  }

  public static queryByID(ID: number) {
    return DB.property.findUnique({
      where: {
        id: ID,
      },
    });
  }
}

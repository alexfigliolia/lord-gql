import { DB } from "db/Client";
import type { OrgQueryArgs } from "./types";
import { GraphQLError } from "graphql";

export class OrgController {
  public static routeSingle({ id, follow_all }: OrgQueryArgs) {
    if (typeof id === "number") {
      return this.queryByID(id, follow_all);
    }
    throw new GraphQLError("Organizations must be queried by ID");
  }

  public static routeMulti({ owner_id, follow_all }: OrgQueryArgs) {
    if (typeof owner_id === "number") {
      return this.queryByOwnerID(owner_id, follow_all);
    }
    throw new GraphQLError("Organizations must be queried by ID");
  }

  public static async queryByOwnerID(ID: number, follow = false) {
    const many = await DB.organization.findMany({
      where: {
        owner_id: ID,
      },
      include: follow ? this.followArgs : {},
    });
    return many;
  }

  public static queryByID(ID: number, follow = false) {
    return DB.organization.findUnique({
      where: {
        id: ID,
      },
      include: follow ? this.followArgs : {},
    });
  }

  private static followArgs = {
    users: true,
    issues: true,
    properties: true,
  };
}

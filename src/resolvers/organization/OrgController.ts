import { DB } from "db/Client";
import type { OrgQueryArgs } from "./types";
import { GraphQLError } from "graphql";

export class OrgController {
  public static routeSingle({ id }: OrgQueryArgs) {
    if (typeof id === "number") {
      return this.queryByID(id);
    }
    throw new GraphQLError("Organizations must be queried by ID");
  }

  public static routeMulti({ owner_id }: OrgQueryArgs) {
    if (typeof owner_id === "number") {
      return this.queryByOwnerID(owner_id);
    }
    throw new GraphQLError("Organizations must be queried by ID");
  }

  public static queryByOwnerID(ID: number) {
    return DB.organization.findMany({
      where: {
        owner_id: ID,
      },
      include: {
        users: true,
        issues: {
          orderBy: {
            created_at: "desc",
          },
          include: {
            assigned: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        properties: true,
      },
    });
  }

  public static queryByID(ID: number) {
    return DB.organization.findUnique({
      where: {
        id: ID,
      },
      include: {
        issues: true,
        properties: true,
      },
    });
  }

  public static createOrganization(name: string, owner: number) {
    return DB.organization.create({
      data: {
        name: name,
        owner_id: owner,
        users: { connect: { id: owner } },
      },
    });
  }
}

import { DB } from "db/Client";
import type { ICreateIssue, IssueQueryArgs } from "./types";
import { GraphQLError } from "graphql";

export class IssueController {
  public static routeSingle({ id }: IssueQueryArgs) {
    if (typeof id === "number") {
      return this.queryByID(id);
    }
    throw new GraphQLError("Issues must be queried by ID");
  }

  public static routeMulti({
    unit_id,
    assigned_id,
    organization_id,
  }: IssueQueryArgs) {
    if (typeof unit_id === "number") {
      return this.queryByUnitID(unit_id);
    }
    if (typeof organization_id === "number") {
      return this.queryByOrganizationID(organization_id);
    }
    if (typeof assigned_id === "number") {
      return this.assignedUserID(assigned_id);
    }
    throw new GraphQLError("Issues must be queried by ID");
  }

  public static queryByUnitID(ID: number) {
    return DB.lease.findMany({
      where: {
        unit_id: ID,
      },
    });
  }

  public static queryByOrganizationID(ID: number) {
    return DB.issue.findMany({
      where: {
        organization_id: ID,
      },
    });
  }

  public static assignedUserID(ID: number) {
    return DB.issue.findMany({
      where: {
        assigned_id: ID,
      },
    });
  }

  public static queryByID(ID: number) {
    return DB.issue.findUnique({
      where: {
        id: ID,
      },
    });
  }

  public static create(args: ICreateIssue) {
    return DB.issue.create({
      data: args,
    });
  }
}

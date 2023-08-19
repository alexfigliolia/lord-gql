import moment from "moment";
import { DB } from "db/Client";
import type { CreateLeaseArgs, LeaseQueryArgs } from "./types";
import { GraphQLError } from "graphql";

export class LeaseController {
  public static create({
    users,
    amount,
    unit_id,
    end_date,
    start_date,
    property_id,
  }: CreateLeaseArgs) {
    const diff = moment().utc().diff(moment(end_date));
    return DB.lease.create({
      data: {
        amount,
        unit_id,
        end_date,
        start_date,
        property_id,
        active: diff < 0,
        users: {
          connect: users.map((id) => ({ id })),
        },
      },
      include: {
        users: true,
        payments: true,
      },
    });
  }

  public static routeSingle({ id }: LeaseQueryArgs) {
    if (typeof id === "number") {
      return this.queryByID(id);
    }
    throw new GraphQLError("Leases must be queried by ID");
  }

  public static routeMulti({ unit_id }: LeaseQueryArgs) {
    if (typeof unit_id === "number") {
      return this.queryByUnitID(unit_id);
    }
    throw new GraphQLError("Leases must be queried by ID");
  }

  public static queryByUnitID(ID: number) {
    return DB.lease.findMany({
      where: {
        unit_id: ID,
      },
    });
  }

  public static queryByID(ID: number) {
    return DB.lease.findUnique({
      where: {
        id: ID,
      },
    });
  }
}

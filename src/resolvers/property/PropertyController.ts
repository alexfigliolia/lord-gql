import moment from "moment";
import { DB } from "db/Client";
import type { ICreateProperty } from "./types";

export class PropertyController {
  public static queryByOrganizationID(ID: number) {
    return DB.property.findMany({
      where: {
        organization_id: ID,
      },
      include: {
        units: true,
      },
    });
  }

  public static queryByID(ID: number) {
    return DB.property.findUnique({
      where: {
        id: ID,
      },
      include: {
        units: {
          include: {
            leases: true,
          },
        },
        expenses: true,
        issues: {
          where: {
            created_at: {
              gte: moment().utc().subtract(1, "month").toDate(),
            },
          },
        },
      },
    });
  }

  public static createProperty(args: ICreateProperty) {
    return DB.property.create({
      data: args,
      include: {
        units: {
          include: {
            leases: true,
          },
        },
        issues: true,
      },
    });
  }
}

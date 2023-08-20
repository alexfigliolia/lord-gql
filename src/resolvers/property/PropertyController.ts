import moment from "moment";
import { DB } from "db/Client";
import type { ICreateProperty } from "./types";

export class PropertyController {
  public static queryByOrganizationID(ID: number) {
    const oneYearAgo = moment().utc().subtract(1, "year").toDate();
    return DB.property.findMany({
      where: {
        organization_id: ID,
      },
      include: {
        payments: {
          where: {
            created_at: {
              gte: oneYearAgo,
            },
          },
          orderBy: {
            created_at: "asc",
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
        payments: true,
        expenses: true,
      },
    });
  }

  public static propertyUIQuery(id: number) {
    const oneYearAgo = moment().utc().subtract(1, "year").toDate();
    return DB.property.findUnique({
      where: {
        id,
      },
      include: {
        units: {
          include: {
            leases: {
              where: {
                OR: [
                  {
                    end_date: {
                      gte: oneYearAgo,
                    },
                  },
                  {
                    start_date: {
                      gte: oneYearAgo,
                    },
                  },
                ],
              },
              orderBy: {
                start_date: "asc",
              },
            },
          },
        },
        issues: {
          where: {
            created_at: {
              gte: moment().utc().subtract(1, "month").toDate(),
            },
          },
        },
        expenses: {
          select: {
            amount: true,
            created_at: true,
          },
          where: {
            created_at: {
              gte: oneYearAgo,
            },
          },
          orderBy: {
            created_at: "asc",
          },
        },
        payments: {
          select: {
            amount: true,
            created_at: true,
          },
          where: {
            created_at: {
              gte: oneYearAgo,
            },
          },
          orderBy: {
            created_at: "asc",
          },
        },
      },
    });
  }
}

import { DB } from "db/Client";
import type { OrgByID } from "./types";
import moment from "moment";

export class OrgController {
  public static queryByOwnerID(ID: number) {
    return DB.organization.findMany({
      where: {
        owner_id: ID,
      },
      include: this.includes,
    });
  }

  public static queryByID(ID: number) {
    return DB.organization.findUnique({
      where: {
        id: ID,
      },
      include: this.includes,
    });
  }

  public static async queryUsersByOrgID(ID: number) {
    const org = await DB.organization.findUnique({
      where: {
        id: ID,
      },
      include: {
        users: true,
      },
    });
    return org?.users || [];
  }

  public static queryByAffiliation(user_id: number) {
    return DB.organization.findMany({
      where: {
        users: {
          some: {
            id: user_id,
          },
        },
      },
      include: {
        _count: {
          select: {
            issues: {
              where: {
                status: {
                  not: "complete",
                },
              },
            },
            properties: true,
            users: true,
          },
        },
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

  public static createAndGetStats(name: string, owner: number) {
    return DB.organization.create({
      data: {
        name: name,
        owner_id: owner,
        users: { connect: { id: owner } },
      },
      include: {
        _count: {
          select: {
            issues: {
              where: {
                status: {
                  not: "complete",
                },
              },
            },
            properties: true,
            users: true,
          },
        },
      },
    });
  }

  public static addUser(user_id: number, org_id: number) {
    return DB.organization.update({
      where: {
        id: org_id,
      },
      data: {
        users: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  }

  private static get includes() {
    const oneYearAgo = moment().utc().subtract(1, "year").toDate();
    return {
      users: true,
      issues: this.issues,
      properties: {
        include: {
          expenses: {
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
            where: {
              created_at: {
                gte: oneYearAgo,
              },
            },
            orderBy: {
              created_at: "asc",
            },
          },
          units: {
            include: {
              leases: {
                where: {
                  end_date: {
                    gte: oneYearAgo,
                  },
                },
                orderBy: {
                  created_at: "asc",
                },
              },
            },
          },
          issues: this.issues,
        },
      },
      expenses: {
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
        where: {
          created_at: {
            gte: oneYearAgo,
          },
        },
        orderBy: {
          created_at: "asc",
        },
      },
    } as const;
  }

  private static get issues() {
    return {
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
        property: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    } as const;
  }

  public static async findAvailableLessors({ id }: OrgByID) {
    return DB.organization.findFirst({
      where: {
        id,
      },
      select: {
        users: true,
      },
    });
  }
}

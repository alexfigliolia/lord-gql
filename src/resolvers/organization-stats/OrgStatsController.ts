import { DB } from "db/Client";

export class OrgStatsController {
  public static organizationStats(user_id: number) {
    return DB.organization.findMany({
      where: {
        AND: {
          users: {
            some: {
              id: user_id,
            },
          },
          roles: {
            some: {
              AND: {
                user_id,
                role: {
                  not: {
                    equals: "resident",
                  },
                },
              },
            },
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
}

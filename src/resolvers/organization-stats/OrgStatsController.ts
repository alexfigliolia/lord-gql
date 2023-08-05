import { DB } from "db/Client";

export class OrgStatsController {
  public static organizationStats(user_id: number) {
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
}

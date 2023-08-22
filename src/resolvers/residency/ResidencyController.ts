import { DB } from "db/Client";
import moment from "moment";

export class ResidencyController {
  public static findByUserID(user_id: number) {
    const startOfMonth = moment().startOf("month").toDate();
    return DB.lease.findMany({
      where: {
        AND: {
          users: {
            some: {
              id: user_id,
            },
          },
          active: true,
        },
      },
      include: {
        property: {
          select: {
            id: true,
            name: true,
          },
        },
        payments: {
          where: {
            created_at: {
              gte: startOfMonth,
            },
          },
          select: {
            id: true,
            amount: true,
          },
        },
        unit: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }
}

import { DB } from "db/Client";
import type { ICreatePayment } from "./types";
import { GraphQLError } from "graphql";

export class PaymentController {
  public static queryByID(id: number) {
    return DB.payment.findUnique({
      where: {
        id,
      },
    });
  }

  public static queryByUnitID(lease_id: number) {
    return DB.payment.findMany({
      where: {
        lease_id,
      },
    });
  }

  public static async create(args: ICreatePayment) {
    const lease = await DB.lease.findFirst({
      where: {
        property_id: args.property_id,
        unit_id: args.unit_id,
        users: {
          some: {
            id: args.user_id,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    if (!lease) {
      throw new GraphQLError("A lease was not found for this user");
    }
    return DB.payment.create({
      data: {
        ...args,
        lease_id: lease.id,
      },
    });
  }
}

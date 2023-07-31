import { DB } from "db/Client";

export class PaymentController {
  public static queryByID(id: number) {
    return DB.payments.findUnique({
      where: {
        id,
      },
    });
  }

  public static queryByUnitID(lease_id: number) {
    return DB.payments.findMany({
      where: {
        lease_id,
      },
    });
  }
}

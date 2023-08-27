import { DB } from "db/Client";

export class AccountController {
  public static fetch(id: number) {
    return DB.user.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            assignments: true,
            leases: true,
            linked_bank_accounts: true,
            payment_methods: true,
            organizations: true,
          },
        },
      },
    });
  }
}

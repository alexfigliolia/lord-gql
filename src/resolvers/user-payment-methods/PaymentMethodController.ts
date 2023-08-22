import { DB } from "db/Client";
import type { ICreateLinkedBankAccount, ICreatePaymentMethod } from "./types";
import { Banking } from "modules/Banking";

export class PaymentMethodController {
  public static findByID(id: number) {
    return DB.user.findUnique({
      where: {
        id,
      },
      include: {
        payment_methods: {
          select: {
            id: true,
            name: true,
            expiration: true,
          },
        },
        linked_bank_accounts: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public static createPaymentMethod(args: ICreatePaymentMethod) {
    return DB.paymentMethod.create({
      data: {
        ...args,
        validated: false,
        name: Banking.cardType(args.number),
      },
    });
  }

  public static createLinkedBankAccount(args: ICreateLinkedBankAccount) {
    return DB.linkedBankAccount.create({
      data: {
        ...args,
        validated: false,
      },
    });
  }
}

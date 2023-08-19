import { DB } from "db/Client";
import type { ICreateUnit } from "./types";

export class UnitController {
  public static queryByPropertyID(ID: number) {
    return DB.unit.findMany({
      where: {
        property_id: ID,
      },
    });
  }

  public static queryByID(ID: number) {
    return DB.unit.findUnique({
      where: {
        id: ID,
      },
    });
  }

  public static create(args: ICreateUnit) {
    return DB.unit.create({
      data: args,
      include: {
        leases: true,
      },
    });
  }
}

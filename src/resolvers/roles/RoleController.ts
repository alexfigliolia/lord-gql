import { DB } from "db/Client";
import type { ICreateRole } from "./types";

export class RoleController {
  public static findByID(id: number) {
    return DB.userRoleEntry.findUnique({
      where: {
        id,
      },
    });
  }

  public static findByUserID(id: number) {
    return DB.userRoleEntry.findMany({
      where: {
        user_id: id,
      },
    });
  }

  public static create(data: ICreateRole) {
    return DB.userRoleEntry.create({ data });
  }
}

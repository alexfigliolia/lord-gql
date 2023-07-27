import { DB } from "db";
import type { UserArgs } from "./types";
import { GraphQLError } from "graphql";

export class UserController {
  public static routeQuery(args: UserArgs) {
    if (typeof args.id === "number") {
      return this.queryByID(args.id);
    }
    if (typeof args.name === "string") {
      return this.searchByName(args.name);
    }
    throw new GraphQLError("Unimplemented");
  }

  public static queryByID(id: number) {
    return DB.user.findUnique({
      where: {
        id,
      },
    });
  }

  private static searchByName(name: string) {
    return DB.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}

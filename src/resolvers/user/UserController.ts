import { DB } from "db";
import type { UserArgs } from "./types";
import { GraphQLError } from "graphql";

export class UserController {
  public static routeSingle({ id }: UserArgs) {
    if (typeof id === "number") {
      return this.queryByID(id);
    }
    throw new GraphQLError("Unimplemented");
  }

  public static routeMulti({ name }: UserArgs) {
    if (typeof name === "string") {
      return this.searchByName(name);
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

import { DB } from "db/Client";
import type { AccountFromInvite, IInvite, InviteArgs } from "./types";
import { AuthController } from "resolvers/authentication/AuthController";
import { GraphQLError } from "graphql";

export class InviteController {
  public static routeQuery({ email, organization_id }: InviteArgs) {
    if (typeof email === "string") {
      return this.queryByEmail(email);
    }
    if (typeof organization_id === "number") {
      return this.queryByOrganization(organization_id);
    }
    throw new GraphQLError(
      "Searching for invites requires a user's email address or organization's ID"
    );
  }

  static queryByEmail(email: string) {
    return DB.invite.findMany({
      where: {
        email,
      },
    });
  }

  public static queryByOrganization(id: number) {
    return DB.invite.findMany({
      where: {
        organization_id: id,
      },
    });
  }

  static create(data: IInvite) {
    return DB.invite.create({
      data,
    });
  }

  public static deleteByID(id: number) {
    return DB.invite.delete({
      where: {
        id,
      },
    });
  }

  public static async acceptInvite(args: AccountFromInvite) {
    const { invite_id, ...rest } = args;
    const user = await AuthController.createUserFromInvite(rest);
    await this.deleteByID(invite_id);
    return user;
  }
}

import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { DB } from "db";
import { GraphQLError } from "graphql";
import type { CookieOptions } from "express";
import { Environment } from "Environment";
import type { LoginArgs, OnBoardArgs, User, UserFromInvite } from "./types";
import { OrgController } from "resolvers/organization/OrgController";
import { RoleController } from "resolvers/roles/RoleController";

export class AuthController {
  private static SALTS = 10;
  private static AGE = 30 * 24 * 60 * 60 * 1000;
  public static async login({ email, password }: LoginArgs) {
    const user = await DB.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new GraphQLError("There are no users with this email");
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new GraphQLError("The password is incorrect");
  }

  public static async createUserFromInvite(args: UserFromInvite) {
    const { organization_id, ...userArgs } = args;
    const user = await DB.user.create({
      data: {
        name: userArgs.name,
        email: userArgs.email.toLocaleLowerCase(),
        password: await bcrypt.hash(userArgs.password, this.SALTS),
      },
    });
    await OrgController.addUser(user.id, organization_id);
    return user;
  }

  public static async onboard({
    organization,
    name,
    email,
    password,
  }: OnBoardArgs) {
    const user = await DB.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      throw new GraphQLError("A user with this email address already exists");
    }
    const newAccount = await DB.user.create({
      data: {
        name,
        email: email.toLocaleLowerCase(),
        password: await bcrypt.hash(password, this.SALTS),
      },
    });
    const newOrg = await OrgController.createOrganization(
      organization,
      newAccount.id
    );
    await RoleController.create({
      organization_id: newOrg.id,
      user_id: newAccount.id,
      role: "owner",
    });
    return newAccount;
  }

  public static generateToken<T extends User>({ email, name, id }: T) {
    return JWT.sign({ id, name, email }, Environment.TOKEN);
  }

  public static verifyToken(token: string) {
    return JWT.verify(token, Environment.TOKEN) as Omit<User, "password">;
  }

  public static cookieOptions: CookieOptions = {
    maxAge: this.AGE,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  };
}

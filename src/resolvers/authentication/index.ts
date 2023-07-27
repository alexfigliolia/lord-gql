import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLError,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UserType } from "resolvers/user";
import type { Context } from "resolvers/types";
import type { LoginArgs, SignUpArgs } from "./types";
import { AuthController } from "./AuthController";

const AuthenticationType = new GraphQLObjectType({
  name: "authentication",
  fields: {
    user: {
      type: UserType,
    },
  },
});

export const login: GraphQLFieldConfig<any, any> = {
  type: AuthenticationType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: any, args: LoginArgs, context: Context) => {
    const user = await AuthController.login(args);
    context.res.cookie(
      "L_User",
      AuthController.generateToken(user),
      AuthController.cookieOptions
    );
    return { user };
  },
};

export const signup: GraphQLFieldConfig<any, any> = {
  type: AuthenticationType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: any, args: SignUpArgs, context: Context) => {
    const user = await AuthController.signup({ ...args, role: "owner" });
    context.res.cookie(
      "L_User",
      AuthController.generateToken(user),
      AuthController.cookieOptions
    );
    return { user };
  },
};

export const verifyToken: GraphQLFieldConfig<any, any> = {
  type: AuthenticationType,
  resolve: (_1: any, _2: any, context: Context) => {
    try {
      const token = context.req.cookies["L_User"];
      const result = AuthController.verifyToken(token || "");
      const { email, name, role, id } = result;
      return { user: { id, name, role, email } };
    } catch (error) {
      throw new GraphQLError("Authorization not found");
    }
  },
};

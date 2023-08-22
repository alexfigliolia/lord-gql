import type { GraphQLFieldConfig } from "graphql";
import { GraphQLError, GraphQLString, GraphQLBoolean } from "graphql";
import { UserType } from "resolvers/user";
import type { Context } from "resolvers/types";
import type { LoginArgs, OnBoardArgs } from "./types";
import { AuthController } from "./AuthController";
import { Schema } from "modules/Schema";

export const login: GraphQLFieldConfig<any, Context, LoginArgs> = {
  type: Schema.nonNull(UserType),
  args: {
    email: {
      type: Schema.nonNull(GraphQLString),
    },
    password: {
      type: Schema.nonNull(GraphQLString),
    },
  },
  resolve: async (_, args, context) => {
    const user = await AuthController.login(args);
    context.res.cookie(
      "L_User",
      AuthController.generateToken(user),
      AuthController.cookieOptions
    );
    return user;
  },
};

export const onboard: GraphQLFieldConfig<any, Context, OnBoardArgs> = {
  type: Schema.nonNull(UserType),
  args: {
    name: {
      type: Schema.nonNull(GraphQLString),
    },
    email: {
      type: Schema.nonNull(GraphQLString),
    },
    password: {
      type: Schema.nonNull(GraphQLString),
    },
    organization: {
      type: Schema.nonNull(GraphQLString),
    },
  },
  resolve: async (_, args, context) => {
    const user = await AuthController.onboard(args);
    context.res.cookie(
      "L_User",
      AuthController.generateToken(user),
      AuthController.cookieOptions
    );
    return user;
  },
};

export const verifyToken: GraphQLFieldConfig<any, any> = {
  type: Schema.nonNull(UserType),
  resolve: (_1: any, _2: any, context: Context) => {
    try {
      const token = context.req.cookies["L_User"];
      const result = AuthController.verifyToken(token || "");
      const { email, name, id } = result;
      return { id, name, email };
    } catch (error) {
      throw new GraphQLError("Authorization not found");
    }
  },
};

export const logout: GraphQLFieldConfig<any, any> = {
  type: Schema.nonNull(GraphQLBoolean),
  resolve: (_1: any, _2: any, context: Context) => {
    try {
      context.res.clearCookie("L_User", AuthController.cookieOptions);
      return true;
    } catch (error) {
      throw new GraphQLError("Authorization not found");
    }
  },
};

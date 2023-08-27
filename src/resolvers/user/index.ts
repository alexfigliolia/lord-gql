import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLString, GraphQLObjectType } from "graphql";
import { UserController } from "./UserController";
import type { UserArgs } from "./types";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";

export const UserType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (user) => user.id,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (user) => user.name,
    },
    email: {
      type: Schema.nonNull(GraphQLString),
      resolve: (user) => user.email,
    },
    password: {
      type: Schema.nonNull(GraphQLString),
      resolve: (user) => user.password,
    },
  },
});

export const user: GraphQLFieldConfig<any, Context, UserArgs> = {
  type: Schema.nonNull(UserType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "primary key",
    },
  },
  resolve: (_, args) => {
    return UserController.routeSingle(args);
  },
};

export const users: GraphQLFieldConfig<any, Context, UserArgs> = {
  type: Schema.nonNullArray(UserType),
  args: {
    name: {
      type: Schema.nonNull(GraphQLString),
      description: "search by name",
    },
  },
  resolve: (_, args) => {
    return UserController.routeMulti(args);
  },
};

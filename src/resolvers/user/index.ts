import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";
import { UserController } from "./UserController";
import type { UserArgs } from "./types";
import { Schema } from "modules/Schema";

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

export const user: GraphQLFieldConfig<any, any, UserArgs> = {
  type: UserType,
  args: {
    id: {
      type: GraphQLInt,
      description: "primary key",
    },
  },
  resolve: (_, args) => {
    return UserController.routeSingle(args);
  },
};

export const users: GraphQLFieldConfig<any, any, UserArgs> = {
  type: new GraphQLList(UserType),
  args: {
    name: {
      type: GraphQLString,
      description: "search by name",
    },
  },
  resolve: (_, args) => {
    return UserController.routeMulti(args);
  },
};

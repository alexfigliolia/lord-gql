import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import { UserController } from "./UserController";
import type { UserArgs } from "./types";

export const UserType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (user) => user.id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.name,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.email,
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.role,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.password,
    },
  },
});

export const user: GraphQLFieldConfig<any, any> = {
  type: UserType,
  args: {
    id: {
      type: GraphQLInt,
      description: "primary key",
    },
  },
  resolve: (_: any, args: UserArgs) => {
    return UserController.routeSingle(args);
  },
};

export const users: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(UserType),
  args: {
    name: {
      type: GraphQLString,
      description: "search by name",
    },
  },
  resolve: (_: any, args: UserArgs) => {
    return UserController.routeMulti(args);
  },
};

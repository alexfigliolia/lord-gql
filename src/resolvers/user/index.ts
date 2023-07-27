import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
} from "graphql";
import { UserController } from "./UserController";
import type { UserArgs } from "./types";

export const UserType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: {
      type: GraphQLInt,
      resolve: (user) => user.id,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.email,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.password,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.name,
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
    name: {
      type: GraphQLString,
      description: "search by name",
    },
  },
  resolve: (_: any, args: UserArgs) => {
    return UserController.routeQuery(args);
  },
};

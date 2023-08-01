import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
  GraphQLEnumType,
} from "graphql";
import { UserController } from "./UserController";
import type { UserArgs } from "./types";
import { Schema } from "modules/Schema";

export const UserRole = new GraphQLEnumType({
  name: "UserRole",
  values: {
    owner: {
      value: "owner",
    },
    employee: {
      value: "employee",
    },
    resident: {
      value: "resident",
    },
  },
});

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
    role: {
      type: Schema.nonNull(UserRole),
      resolve: (user) => user.role,
    },
    password: {
      type: Schema.nonNull(GraphQLString),
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

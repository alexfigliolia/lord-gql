import type { GraphQLFieldConfig } from "graphql";
import { GraphQLEnumType, GraphQLInt, GraphQLObjectType } from "graphql";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";
import { RoleController } from "./RoleController";

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

export const RoleType = new GraphQLObjectType({
  name: "role",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (role) => role.id,
    },
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (role) => role.user_id,
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (role) => role.organization_id,
    },
    role: {
      type: Schema.nonNull(UserRole),
      resolve: (role) => role.role,
    },
  },
});

export const role: GraphQLFieldConfig<any, Context, { id: number }> = {
  type: Schema.nonNull(RoleType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "Primary key",
    },
  },
  resolve: (_, args) => {
    return RoleController.findByID(args.id);
  },
};

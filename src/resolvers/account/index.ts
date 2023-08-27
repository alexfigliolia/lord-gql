import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";
import { AccountController } from "./AccountController";

export const AccountStatsType = new GraphQLObjectType({
  name: "AccountStats",
  fields: {
    assignments: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (stats) => stats.assignments,
    },
    leases: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (stats) => stats.leases,
    },
    linked_bank_accounts: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (stats) => stats.linked_bank_accounts,
    },
    payment_methods: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (stats) => stats.payment_methods,
    },
    organizations: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (stats) => stats.payment_methods,
    },
  },
});

export const AccountType = new GraphQLObjectType({
  name: "account",
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
    _count: {
      type: Schema.nonNull(AccountStatsType),
      resolve: (user) => user._count,
    },
  },
});

export const account: GraphQLFieldConfig<any, Context, { id: number }> = {
  type: Schema.nonNull(AccountType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "User primary key",
    },
  },
  resolve: (_, args) => {
    return AccountController.fetch(args.id);
  },
};

import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";
import { ResidencyController } from "./ResidencyController";

export const Entity = new GraphQLObjectType({
  name: "entity",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (entity) => entity.id,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (entity) => entity.name,
    },
  },
});

export const Transaction = new GraphQLObjectType({
  name: "transaction",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (transaction) => transaction.id,
    },
    amount: {
      type: Schema.nonNull(GraphQLFloat),
      resolve: (transaction) => transaction.amount,
    },
  },
});

export const ResidenceType = new GraphQLObjectType({
  name: "residence",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (residence) => residence.id,
    },
    unit_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (residence) => residence.unit_id,
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (residence) => residence.organization_id,
    },
    amount: {
      type: Schema.nonNull(GraphQLFloat),
      resolve: (residence) => residence.amount,
    },
    start_date: {
      type: Schema.nonNull(GraphQLString),
      resolve: (residence) => residence.start_date,
    },
    end_date: {
      type: Schema.nonNull(GraphQLString),
      resolve: (residence) => residence.end_date,
    },
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (residence) => residence.property_id,
    },
    active: {
      type: Schema.nonNull(GraphQLBoolean),
      resolve: (residence) => residence.active,
    },
    created_at: {
      type: Schema.nonNull(GraphQLString),
      resolve: (residence) => residence.created_at,
    },
    property: {
      type: Schema.nonNull(Entity),
      resolve: (residence) => residence.property,
    },
    unit: {
      type: Schema.nonNull(Entity),
      resolve: (residence) => residence.unit,
    },
    payments: {
      type: Schema.nonNullArray(Transaction),
      resolve: (residence) => residence.payments,
    },
  },
});

export const residencies: GraphQLFieldConfig<
  any,
  Context,
  { user_id: number }
> = {
  type: Schema.nonNullArray(ResidenceType),
  args: {
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "A user's primary key",
    },
  },
  resolve: (_, args) => {
    return ResidencyController.findByUserID(args.user_id);
  },
};

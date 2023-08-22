import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
} from "graphql";
import { LeaseController } from "./LeaseController";
import type { CreateLeaseArgs, LeaseQueryArgs } from "./types";
import { Schema } from "modules/Schema";
import { PaymentType } from "resolvers/payments";
import { UserType } from "resolvers/user";

export const LeaseType = new GraphQLObjectType({
  name: "lease",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (lease) => lease.id,
    },
    unit_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (lease) => lease.unit_id,
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (lease) => lease.organization_id,
    },
    amount: {
      type: Schema.nonNull(GraphQLFloat),
      resolve: (lease) => lease.amount,
    },
    payments: {
      type: Schema.nonNullArray(PaymentType),
      resolve: (lease) => lease.payments,
    },
    start_date: {
      type: Schema.nonNull(GraphQLString),
      resolve: (lease) => lease.start_date,
    },
    end_date: {
      type: Schema.nonNull(GraphQLString),
      resolve: (lease) => lease.end_date,
    },
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (lease) => lease.property_id,
    },
    active: {
      type: Schema.nonNull(GraphQLBoolean),
      resolve: (lease) => lease.active,
    },
    users: {
      type: Schema.nonNullArray(UserType),
      resolve: (lease) => lease.users,
    },
    created_at: {
      type: Schema.nonNull(GraphQLString),
      resolve: (lease) => lease.created_at,
    },
  },
});

export const lease: GraphQLFieldConfig<any, any> = {
  type: Schema.nonNull(LeaseType),
  args: {
    id: {
      type: GraphQLInt,
      description: "primary key",
    },
  },
  resolve: (_: any, args: LeaseQueryArgs) => {
    return LeaseController.routeSingle(args);
  },
};

export const leases: GraphQLFieldConfig<any, any, LeaseQueryArgs> = {
  type: Schema.nonNullArray(LeaseType),
  args: {
    unit_id: {
      type: GraphQLInt,
      description: "search by the unit's id",
    },
  },
  resolve: (_, args) => {
    return LeaseController.routeMulti(args);
  },
};

export const createLease: GraphQLFieldConfig<any, any, CreateLeaseArgs> = {
  type: Schema.nonNull(LeaseType),
  args: {
    unit_id: {
      type: Schema.nonNull(GraphQLInt),
    },
    property_id: {
      type: Schema.nonNull(GraphQLInt),
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
    },
    start_date: {
      type: Schema.nonNull(GraphQLString),
    },
    end_date: {
      type: Schema.nonNull(GraphQLString),
    },
    amount: {
      type: Schema.nonNull(GraphQLFloat),
    },
    users: {
      type: Schema.nonNullArray(GraphQLInt),
    },
  },
  resolve: (_, args) => {
    return LeaseController.create(args);
  },
};

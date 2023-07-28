import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import { LeaseController } from "./LeaseController";
import type { LeaseQueryArgs } from "./types";
import { Schema } from "modules/Schema";

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
    start_date: {
      type: Schema.nonNull(GraphQLString),
      resolve: (lease) => lease.start_date,
    },
    end_date: {
      type: Schema.nonNull(GraphQLString),
      resolve: (lease) => lease.end_date,
    },
    active: {
      type: Schema.nonNull(GraphQLBoolean),
      resolve: (lease) => lease.active,
    },
    created_at: {
      type: Schema.nonNull(GraphQLString),
      resolve: (lease) => lease.created_at,
    },
  },
});

export const lease: GraphQLFieldConfig<any, any> = {
  type: LeaseType,
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

export const leases: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(LeaseType),
  args: {
    unit_id: {
      type: GraphQLInt,
      description: "search by the unit's id",
    },
  },
  resolve: (_: any, args: LeaseQueryArgs) => {
    return LeaseController.routeMulti(args);
  },
};

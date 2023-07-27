import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { LeaseController } from "./LeaseController";
import type { LeaseQueryArgs } from "./types";

export const LeaseType = new GraphQLObjectType({
  name: "lease",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (lease) => lease.id,
    },
    unit_id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (lease) => lease.unit_id,
    },
    start_date: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (lease) => lease.start_date,
    },
    end_date: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (lease) => lease.end_date,
    },
    active: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (lease) => lease.active,
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLString),
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
    unit_id: {
      type: GraphQLInt,
      description: "search by the unit's id",
    },
  },
  resolve: (_: any, args: LeaseQueryArgs) => {
    return LeaseController.routeQuery(args);
  },
};

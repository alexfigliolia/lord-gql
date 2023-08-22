import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { Schema } from "modules/Schema";
import type { OrgByID } from "resolvers/organization/types";
import type { Context } from "resolvers/types";
import { OrgStatsController } from "./OrgStatsController";

export const OrgStats = new GraphQLObjectType({
  name: "orgStats",
  fields: {
    issues: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (stats) => stats.issues,
    },
    properties: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (stats) => stats.properties,
    },
    users: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (stats) => stats.users,
    },
  },
});

export const OrganizationStats = new GraphQLObjectType({
  name: "organizationStats",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (org) => org.id,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (org) => org.name,
    },
    owner_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (org) => org.owner_id,
    },
    _count: {
      type: Schema.nonNull(OrgStats),
      resolve: (org) => org._count,
    },
  },
});

export const organizationStats: GraphQLFieldConfig<any, Context, OrgByID> = {
  type: Schema.nonNullArray(OrganizationStats),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "user's primary key",
    },
  },
  resolve: (_: any, { id }) => {
    return OrgStatsController.organizationStats(id);
  },
};

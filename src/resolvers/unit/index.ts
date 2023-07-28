import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLString, GraphQLObjectType } from "graphql";
import { UnitController } from "./UnitController";
import type { UnitQueryArgs } from "./types";
import { IssueType } from "resolvers/issue";
import { LeaseType } from "resolvers/lease";
import { Schema } from "modules/Schema";

export const UnitType = new GraphQLObjectType({
  name: "unit",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (unit) => unit.id,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (unit) => unit.name,
    },
    description: {
      type: Schema.nonNull(GraphQLString),
      resolve: (unit) => unit.description,
    },
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (unit) => unit.property_id,
    },
    images: {
      type: Schema.nonNullArray(GraphQLString),
      resolve: (unit) => unit.images,
    },
    leases: {
      type: Schema.nonNullArray(LeaseType),
      resolve: (unit) => unit.leases,
    },
    issues: {
      type: Schema.nonNullArray(IssueType),
      resolve: (unit) => unit.issues,
    },
  },
});

export const property: GraphQLFieldConfig<any, any> = {
  type: UnitType,
  args: {
    id: {
      type: GraphQLInt,
      description: "primary key",
    },
    property_id: {
      type: GraphQLInt,
      description: "search by the property id",
    },
  },
  resolve: (_: any, args: UnitQueryArgs) => {
    return UnitController.routeQuery(args);
  },
};

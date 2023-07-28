import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { UnitController } from "./UnitController";
import type { UnitQueryArgs } from "./types";
import { IssueType } from "resolvers/issue";
import { LeaseType } from "resolvers/lease";

export const UnitType = new GraphQLObjectType({
  name: "unit",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (unit) => unit.id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (unit) => unit.name,
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (unit) => unit.description,
    },
    property_id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (unit) => unit.property_id,
    },
    images: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: (unit) => unit.images,
    },
    leases: {
      type: new GraphQLNonNull(new GraphQLList(LeaseType)),
      resolve: (unit) => unit.leases,
    },
    issues: {
      type: new GraphQLNonNull(new GraphQLList(IssueType)),
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

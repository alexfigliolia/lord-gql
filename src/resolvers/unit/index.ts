import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLString, GraphQLObjectType } from "graphql";
import { UnitController } from "./UnitController";
import { IssueType } from "resolvers/issue";
import { LeaseType } from "resolvers/lease";
import { Schema } from "modules/Schema";
import type { ICreateUnit } from "./types";

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

export const unit: GraphQLFieldConfig<any, any, { id: number }> = {
  type: Schema.nonNull(UnitType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "primary key",
    },
  },
  resolve: (_, args) => {
    return UnitController.queryByID(args.id);
  },
};

export const units: GraphQLFieldConfig<any, any, { property_id: number }> = {
  type: Schema.nonNullArray(UnitType),
  args: {
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "property id",
    },
  },
  resolve: (_, args) => {
    return UnitController.queryByPropertyID(args.property_id);
  },
};

export const createUnit: GraphQLFieldConfig<any, any, ICreateUnit> = {
  type: Schema.nonNull(UnitType),
  args: {
    name: {
      type: Schema.nonNull(GraphQLString),
      description: "The name of the unit",
    },
    description: {
      type: Schema.nonNull(GraphQLString),
      description: "A description of the unit",
    },
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "property id",
    },
  },
  resolve: (_, args) => {
    return UnitController.create(args);
  },
};

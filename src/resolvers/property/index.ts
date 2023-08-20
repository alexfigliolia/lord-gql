import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLString } from "graphql";
import { PropertyController } from "./PropertyController";
import type { ICreateProperty } from "./types";
import type { Context } from "resolvers/types";
import { Schema } from "modules/Schema";
import { PropertyType } from "./schema";

export const propertyUI: GraphQLFieldConfig<any, any, { id: number }> = {
  type: Schema.nonNull(PropertyType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "primary key",
    },
  },
  resolve: (_, args) => {
    return PropertyController.propertyUIQuery(args.id);
  },
};

export const properties: GraphQLFieldConfig<
  any,
  Context,
  { organization_id: number }
> = {
  type: Schema.nonNullArray(PropertyType),
  args: {
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "search by the organization's id",
    },
  },
  resolve: (_, args) => {
    return PropertyController.queryByOrganizationID(args.organization_id);
  },
};

export const createProperty: GraphQLFieldConfig<any, Context, ICreateProperty> =
  {
    type: Schema.nonNull(PropertyType),
    args: {
      organization_id: {
        type: Schema.nonNull(GraphQLInt),
      },
      name: {
        type: Schema.nonNull(GraphQLString),
      },
      description: {
        type: Schema.nonNull(GraphQLString),
      },
      address_1: {
        type: Schema.nonNull(GraphQLString),
      },
      address_2: {
        type: Schema.nonNull(GraphQLString),
      },
      city: {
        type: Schema.nonNull(GraphQLString),
      },
      state: {
        type: Schema.nonNull(GraphQLString),
      },
      zip_code: {
        type: Schema.nonNull(GraphQLString),
      },
    },
    resolve: (_, args) => {
      return PropertyController.createProperty(args);
    },
  };

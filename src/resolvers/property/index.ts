import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { UnitType } from "resolvers/unit";
import { PropertyController } from "./PropertyController";
import type { ICreateProperty, PropertyQueryArgs } from "./types";
import type { Context } from "resolvers/types";
import { Schema } from "modules/Schema";
import { IssueType } from "resolvers/issue";
import { ExpenseType } from "resolvers/expenses";

export const PropertyType = new GraphQLObjectType({
  name: "property",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (property) => property.id,
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (property) => property.organization_id,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (property) => property.name,
    },
    description: {
      type: Schema.nonNull(GraphQLString),
      resolve: (property) => property.description,
    },
    address_1: {
      type: Schema.nonNull(GraphQLString),
      resolve: (property) => property.address_1,
    },
    address_2: {
      type: Schema.nonNull(GraphQLString),
      resolve: (property) => property.address_2,
    },
    city: {
      type: Schema.nonNull(GraphQLString),
      resolve: (property) => property.city,
    },
    state: {
      type: Schema.nonNull(GraphQLString),
      resolve: (property) => property.state,
    },
    zip_code: {
      type: Schema.nonNull(GraphQLString),
      resolve: (property) => property.zip_code,
    },
    images: {
      type: Schema.nonNullArray(GraphQLString),
      resolve: (property) => property.images,
    },
    units: {
      type: Schema.nonNullArray(UnitType),
      resolve: (property) => property.units,
    },
    issues: {
      type: Schema.nonNullArray(IssueType),
      resolve: (property) => property.issues,
    },
    expenses: {
      type: Schema.nonNullArray(ExpenseType),
      resolve: (property) => property.expenses,
    },
  },
});

export const property: GraphQLFieldConfig<any, any> = {
  type: PropertyType,
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "primary key",
    },
  },
  resolve: (_: any, args: PropertyQueryArgs) => {
    return PropertyController.routeSingle(args);
  },
};

export const properties: GraphQLFieldConfig<any, Context, PropertyQueryArgs> = {
  type: new GraphQLList(PropertyType),
  args: {
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "search by the organization's id",
    },
  },
  resolve: (_, args) => {
    return PropertyController.routeMulti(args);
  },
};

export const createProperty: GraphQLFieldConfig<any, Context, ICreateProperty> =
  {
    type: PropertyType,
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

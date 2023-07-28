import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { UnitType } from "resolvers/unit";
import { PropertyController } from "./PropertyController";
import type { ICreateProperty, PropertyQueryArgs } from "./types";
import type { Context } from "resolvers/types";

export const PropertyType = new GraphQLObjectType({
  name: "property",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (property) => property.id,
    },
    organization_id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (property) => property.organization_id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.name,
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.description,
    },
    address_1: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.address_1,
    },
    address_2: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.address_2,
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.city,
    },
    state: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.state,
    },
    zip_code: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.zip_code,
    },
    images: {
      type: new GraphQLList(GraphQLString),
      resolve: (property) => property.images,
    },
    units: {
      type: new GraphQLNonNull(new GraphQLList(UnitType)),
      resolve: (property) => property.units,
    },
  },
});

export const property: GraphQLFieldConfig<any, any> = {
  type: PropertyType,
  args: {
    id: {
      type: GraphQLInt,
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
      type: GraphQLInt,
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
        type: new GraphQLNonNull(GraphQLInt),
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      description: {
        type: new GraphQLNonNull(GraphQLString),
      },
      address_1: {
        type: new GraphQLNonNull(GraphQLString),
      },
      address_2: {
        type: new GraphQLNonNull(GraphQLString),
      },
      city: {
        type: new GraphQLNonNull(GraphQLString),
      },
      state: {
        type: new GraphQLNonNull(GraphQLString),
      },
      zip_code: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: (_, args) => {
      return PropertyController.createProperty(args);
    },
  };

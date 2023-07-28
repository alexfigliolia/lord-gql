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
import type { PropertyQueryArgs } from "./types";

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
      type: new GraphQLList(UnitType),
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

export const properties: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(PropertyType),
  args: {
    organization_id: {
      type: GraphQLInt,
      description: "search by the organization's id",
    },
  },
  resolve: (_: any, args: PropertyQueryArgs) => {
    return PropertyController.routeMulti(args);
  },
};

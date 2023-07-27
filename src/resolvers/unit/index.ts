import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UnitController } from "./UnitController";
import type { UnitQueryArgs } from "./types";

export const UnitType = new GraphQLObjectType({
  name: "unit",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (property) => property.id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.name,
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.description,
    },
    property_id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (property) => property.property_id,
    },
    images: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (property) => property.images,
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

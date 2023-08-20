import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { Schema } from "modules/Schema";
import { ExpenseType } from "resolvers/expenses";
import { IssueType } from "resolvers/issue";
import { PaymentType } from "resolvers/payments";
import { UnitType } from "resolvers/unit";

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
    payments: {
      type: Schema.nonNullArray(PaymentType),
      resolve: (property) => property.payments,
    },
  },
});

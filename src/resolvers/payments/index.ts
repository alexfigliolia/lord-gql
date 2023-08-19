import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Schema } from "modules/Schema";
import { PaymentController } from "./PaymentController";
import type { ICreatePayment } from "./types";

export const PaymentType = new GraphQLObjectType({
  name: "payment",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (payment) => payment.id,
    },
    description: {
      type: Schema.nonNull(GraphQLString),
      resolve: (payment) => payment.description,
    },
    lease_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (payment) => payment.lease_id,
    },
    unit_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (payment) => payment.unit_id,
    },
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (payment) => payment.unit_id,
    },
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (payment) => payment.property_id,
    },
    amount: {
      type: Schema.nonNull(GraphQLFloat),
      resolve: (payment) => payment.amount,
    },
    created_at: {
      type: Schema.nonNull(GraphQLString),
      resolve: (payment) => payment.created_at,
    },
  },
});

export const payment: GraphQLFieldConfig<any, any> = {
  type: PaymentType,
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "primary key",
    },
  },
  resolve: (_: any, args: { id: number }) => {
    return PaymentController.queryByID(args.id);
  },
};

export const payments: GraphQLFieldConfig<any, any> = {
  type: Schema.nonNullArray(PaymentType),
  args: {
    lease_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "search by lease id",
    },
  },
  resolve: (_: any, args: { lease_id: number }) => {
    return PaymentController.queryByID(args.lease_id);
  },
};

export const createPayment: GraphQLFieldConfig<any, any, ICreatePayment> = {
  type: Schema.nonNull(PaymentType),
  args: {
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "The property the payment belongs to",
    },
    description: {
      type: Schema.nonNull(GraphQLString),
      description: "A short description of the payment",
    },
    unit_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "The unit the payment belongs to",
    },
    amount: {
      type: Schema.nonNull(GraphQLFloat),
      description: "The amount of payment",
    },
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "The user that initiated the payment",
    },
  },
  resolve: (_, args) => {
    return PaymentController.create(args);
  },
};

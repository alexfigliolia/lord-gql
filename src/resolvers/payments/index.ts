import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Schema } from "modules/Schema";
import { PaymentController } from "./PaymentController";

export const PaymentsType = new GraphQLObjectType({
  name: "payments",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (payment) => payment.id,
    },
    lease_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (payment) => payment.lease_id,
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
  type: PaymentsType,
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
  type: Schema.nonNullArray(PaymentsType),
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

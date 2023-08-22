import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";
import { PaymentMethodController } from "./PaymentMethodController";
import type { ICreateLinkedBankAccount, ICreatePaymentMethod } from "./types";

export const PaymentMethodType = new GraphQLObjectType({
  name: "PaymentMethod",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (method) => method.id,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (method) => method.name,
    },
    expiration: {
      type: Schema.nonNull(GraphQLString),
      resolve: (method) => method.expiration,
    },
  },
});

export const LinkedBankAccountType = new GraphQLObjectType({
  name: "LinkedBankAccount",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (account) => account.id,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (method) => method.name,
    },
  },
});

export const UserPaymentMethods = new GraphQLObjectType({
  name: "UserPaymentMethods",
  fields: {
    payment_methods: {
      type: Schema.nonNullArray(PaymentMethodType),
      resolve: (method) => method.payment_methods,
    },
    linked_bank_accounts: {
      type: Schema.nonNullArray(LinkedBankAccountType),
      resolve: (method) => method.linked_bank_accounts,
    },
  },
});

export const userPaymentMethods: GraphQLFieldConfig<
  any,
  Context,
  { user_id: number }
> = {
  type: Schema.nonNull(UserPaymentMethods),
  args: {
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "User primary key",
    },
  },
  resolve: (_, args) => {
    return PaymentMethodController.findByID(args.user_id);
  },
};

export const createPaymentMethod: GraphQLFieldConfig<
  any,
  Context,
  ICreatePaymentMethod
> = {
  type: Schema.nonNull(PaymentMethodType),
  args: {
    number: {
      type: Schema.nonNull(GraphQLString),
      description: "Credit or debit card number",
    },
    expiration: {
      type: Schema.nonNull(GraphQLString),
      description: "Card expiration date",
    },
    cvv: {
      type: Schema.nonNull(GraphQLString),
      description: "Card security code",
    },
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "User primary key",
    },
  },
  resolve: (_, args) => {
    return PaymentMethodController.createPaymentMethod(args);
  },
};

export const createLinkedBankAccount: GraphQLFieldConfig<
  any,
  Context,
  ICreateLinkedBankAccount
> = {
  type: Schema.nonNull(LinkedBankAccountType),
  args: {
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "User's primary key",
    },
    routing: {
      type: Schema.nonNull(GraphQLString),
      description: "Account routing number",
    },
    account_number: {
      type: Schema.nonNull(GraphQLString),
      description: "Account number",
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      description: "Bank name",
    },
  },
  resolve: (_, args) => {
    return PaymentMethodController.createLinkedBankAccount(args);
  },
};

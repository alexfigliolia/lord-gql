import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLEnumType,
  GraphQLObjectType,
} from "graphql";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";
import type { ICreateExpense, IExpenses } from "./types";
import { ExpenseController } from "./ExpenseController";

export const ExpenseCategory = new GraphQLEnumType({
  name: "ExpenseCategory",
  values: {
    labor: {
      value: "labor",
    },
    hardware: {
      value: "hardware",
    },
    management: {
      value: "management",
    },
  },
});

export const ExpenseType = new GraphQLObjectType({
  name: "expense",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (expense) => expense.id,
    },
    description: {
      type: Schema.nonNull(GraphQLString),
      resolve: (expense) => expense.description,
    },
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (expense) => expense.property_id,
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (expense) => expense.organization_id,
    },
    amount: {
      type: Schema.nonNull(GraphQLFloat),
      resolve: (expense) => expense.amount,
    },
    category: {
      type: Schema.nonNull(ExpenseCategory),
      resolve: (expense) => expense.category,
    },
    created_at: {
      type: Schema.nonNull(GraphQLString),
      resolve: (expense) => expense.created_at,
    },
  },
});

export const expenses: GraphQLFieldConfig<any, Context, IExpenses> = {
  type: Schema.nonNullArray(ExpenseType),
  args: {
    property_id: {
      type: GraphQLInt,
      description: "The property id relating to the expense",
    },
    category: {
      type: ExpenseCategory,
      description: "The expense's category",
    },
    organization_id: {
      type: GraphQLInt,
      description: "The organization that the expense belongs to",
    },
    search: {
      type: GraphQLInt,
      description: "A search string",
    },
  },
  resolve: (_, args) => {
    return ExpenseController.routeQuery(args);
  },
};

export const createExpense: GraphQLFieldConfig<any, Context, ICreateExpense> = {
  type: Schema.nonNullArray(ExpenseType),
  args: {
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "The property id relating to the expense",
    },
    category: {
      type: Schema.nonNull(ExpenseCategory),
      description: "The expense's category",
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "The organization that the expense belongs to",
    },
    description: {
      type: Schema.nonNull(GraphQLString),
      description: "A description of the expense",
    },
    amount: {
      type: Schema.nonNull(GraphQLFloat),
      description: "The total cost of the expense",
    },
  },
  resolve: (_, args) => {
    return ExpenseController.createExpense(args);
  },
};

import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user } from "./user";
import { login, signup, verifyToken } from "./authentication";

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user,
    login,
    signup,
    verifyToken,
  }),
});

export const Schema = new GraphQLSchema({ query: QueryRoot });

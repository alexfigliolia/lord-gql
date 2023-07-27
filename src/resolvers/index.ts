import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user } from "./user";
import { login, signup, verifyToken } from "./authentication";
import { organization } from "./organization";
import { property } from "./property";
import { lease } from "./lease";
import { issue } from "./issue";

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user,
    login,
    signup,
    verifyToken,
    organization,
    property,
    lease,
    issue,
  }),
});

export const Schema = new GraphQLSchema({ query: QueryRoot });

import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user, users } from "./user";
import { login, signup, verifyToken } from "./authentication";
import { organization, organizations } from "./organization";
import { property, properties } from "./property";
import { lease, leases } from "./lease";
import { issue, issues } from "./issue";

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user,
    users,
    login,
    signup,
    verifyToken,
    organization,
    organizations,
    property,
    properties,
    lease,
    leases,
    issue,
    issues,
  }),
});

export const Schema = new GraphQLSchema({ query: QueryRoot });

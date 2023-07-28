import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user, users } from "./user";
import { login, logout, onboard, verifyToken } from "./authentication";
import { organization, organizations } from "./organization";
import { property, properties, createProperty } from "./property";
import { lease, leases } from "./lease";
import { issue, issues } from "./issue";

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user,
    users,
    login,
    logout,
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

const MutationRoot = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    onboard,
    createProperty,
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

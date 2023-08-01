import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user, users } from "./user";
import { login, logout, onboard, verifyToken } from "./authentication";
import {
  organization,
  organizations,
  organizationAffiliations,
} from "./organization";
import { property, properties, createProperty } from "./property";
import { lease, leases } from "./lease";
import {
  issue,
  issues,
  createIssue,
  setIssueStatus,
  setIssueAssignment,
} from "./issue";
import { issueAttachment, issueAttachments } from "./issue-attachments";
import { payment, payments } from "./payments";
import { invites, createInvite, acceptInvite } from "./invite";

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
    organizationAffiliations,
    property,
    properties,
    lease,
    leases,
    payment,
    payments,
    issue,
    issues,
    issueAttachment,
    issueAttachments,
    invites,
  }),
});

const MutationRoot = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    onboard,
    createProperty,
    createIssue,
    setIssueStatus,
    setIssueAssignment,
    createInvite,
    acceptInvite,
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

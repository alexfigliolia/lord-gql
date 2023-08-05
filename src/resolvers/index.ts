import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user, users } from "./user";
import { login, logout, onboard, verifyToken } from "./authentication";
import {
  organization,
  organizations,
  organizationsUsers,
  organizationAffiliations,
} from "./organization";
import { organizationStats } from "./organization-stats";
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
import { expenses, createExpense } from "./expenses";

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
    organizationStats,
    organizationsUsers,
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
    expenses,
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
    createExpense,
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user, users } from "./user";
import { login, logout, onboard, verifyToken } from "./authentication";
import {
  organization,
  organizations,
  createOrganization,
  organizationsUsers,
  organizationLessors,
  organizationAffiliations,
} from "./organization";
import { organizationStats } from "./organization-stats";
import { property, properties, createProperty } from "./property";
import { unit, units, createUnit } from "./unit";
import { lease, leases, createLease } from "./lease";
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
    organizationLessors,
    organizationAffiliations,
    property,
    properties,
    unit,
    units,
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
    createUnit,
    createIssue,
    setIssueStatus,
    setIssueAssignment,
    createInvite,
    acceptInvite,
    createExpense,
    createOrganization,
    createLease,
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

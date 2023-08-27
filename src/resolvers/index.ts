import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user, users } from "./user";
import { account } from "./account";
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
import { properties, propertyUI, createProperty } from "./property";
import { unit, units, createUnit } from "./unit";
import { lease, leases, createLease } from "./lease";
import {
  issue,
  issues,
  createIssue,
  setIssueStatus,
  setIssueAssignment,
} from "./issue";
import { role } from "./roles";
import { residencies } from "./residency";
import { issueAttachment, issueAttachments } from "./issue-attachments";
import { payment, payments, createPayment } from "./payments";
import {
  userPaymentMethods,
  createPaymentMethod,
  createLinkedBankAccount,
} from "./user-payment-methods";
import { invites, createInvite, acceptInvite } from "./invite";
import { expenses, createExpense } from "./expenses";

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user,
    users,
    role,
    login,
    logout,
    account,
    verifyToken,
    organization,
    organizations,
    organizationStats,
    organizationsUsers,
    organizationLessors,
    organizationAffiliations,
    propertyUI,
    properties,
    unit,
    units,
    lease,
    leases,
    payment,
    payments,
    residencies,
    issue,
    issues,
    issueAttachment,
    issueAttachments,
    invites,
    expenses,
    userPaymentMethods,
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
    createPayment,
    createOrganization,
    createLease,
    createPaymentMethod,
    createLinkedBankAccount,
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

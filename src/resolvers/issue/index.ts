import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLEnumType,
} from "graphql";
import { IssueController } from "./IssueController";
import type {
  IAssignIssue,
  ICreateIssue,
  IIssueStatus,
  IssueQueryArgs,
} from "./types";
import { Schema } from "modules/Schema";
import { UserType } from "resolvers/user";
import { IssueAttachmentType } from "resolvers/issue-attachments";
import type { Context } from "resolvers/types";

export const IssueClassification = new GraphQLEnumType({
  name: "IssueType",
  values: {
    complaint: {
      value: "complaint",
    },
    fix: {
      value: "fix",
    },
    consultation: {
      value: "consultation",
    },
  },
});

export const IssueStatus = new GraphQLEnumType({
  name: "IssueStatus",
  values: {
    complete: {
      value: "complete",
    },
    open: {
      value: "open",
    },
    inprogress: {
      value: "inprogress",
    },
  },
});

export const IssueType = new GraphQLObjectType({
  name: "issue",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (issue) => issue.id,
    },
    status: {
      type: Schema.nonNull(IssueStatus),
      resolve: (issue) => issue.status,
    },
    type: {
      type: Schema.nonNull(IssueClassification),
      resolve: (issue) => issue.type,
    },
    author: {
      type: Schema.nonNull(GraphQLString),
      resolve: (issue) => issue.author,
    },
    title: {
      type: Schema.nonNull(GraphQLString),
      resolve: (issue) => issue.title,
    },
    description: {
      type: Schema.nonNull(GraphQLString),
      resolve: (issue) => issue.description,
    },
    assigned_id: {
      type: GraphQLInt,
      resolve: (issue) => issue.assigned_id,
    },
    assigned: {
      type: UserType,
      resolve: (issue) => issue.assigned,
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (issue) => issue.organization_id,
    },
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (issue) => issue.property_id,
    },
    unit_id: {
      type: GraphQLInt,
      resolve: (issue) => issue.unit_id,
    },
    created_at: {
      type: Schema.nonNull(GraphQLString),
      resolve: (issue) => issue.created_at,
    },
    attachments: {
      type: Schema.nonNullArray(IssueAttachmentType),
      resolve: (issue) => issue.attachments,
    },
  },
});

export const issue: GraphQLFieldConfig<any, any> = {
  type: Schema.nonNull(IssueType),
  args: {
    id: {
      type: GraphQLInt,
      description: "primary key",
    },
  },
  resolve: (_: any, args: IssueQueryArgs) => {
    return IssueController.routeSingle(args);
  },
};

export const issues: GraphQLFieldConfig<any, any> = {
  type: Schema.nonNullArray(IssueType),
  args: {
    id: {
      type: GraphQLInt,
      description: "primary key",
    },
    unit_id: {
      type: GraphQLInt,
      description: "search by the unit's id",
    },
    organization_id: {
      type: GraphQLInt,
      description: "search by the organization's id",
    },
    assigned_id: {
      type: GraphQLInt,
      description: "search by the assigned user's id",
    },
  },
  resolve: (_: any, args: IssueQueryArgs) => {
    return IssueController.routeMulti(args);
  },
};

export const createIssue: GraphQLFieldConfig<any, Context, ICreateIssue> = {
  type: Schema.nonNull(IssueType),
  args: {
    author: {
      type: Schema.nonNull(GraphQLString),
      description: "The creator of the issue",
    },
    title: {
      type: Schema.nonNull(GraphQLString),
      description: "A title for the issue",
    },
    description: {
      type: Schema.nonNull(GraphQLString),
      description: "A title for the issue",
    },
    property_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "A property the issue relates to",
    },
    unit_id: {
      type: GraphQLInt,
      description: "An optional attachment to a unit",
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "the organization that the issue belongs to",
    },
    assigned_id: {
      type: GraphQLInt,
      description: "A user ID to assign the issue to",
    },
    status: {
      type: IssueStatus,
      description: "The current status of the issue",
    },
    type: {
      type: Schema.nonNull(IssueClassification),
      description: "The type of issue",
    },
  },
  resolve: (_: any, args) => {
    return IssueController.create(args);
  },
};

export const setIssueStatus: GraphQLFieldConfig<any, Context, IIssueStatus> = {
  type: Schema.nonNull(IssueType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "The issue's primary key",
    },
    status: {
      type: Schema.nonNull(IssueStatus),
      description: "The new status of the issue",
    },
  },
  resolve: (_: any, args) => {
    return IssueController.setStatus(args);
  },
};

export const setIssueAssignment: GraphQLFieldConfig<
  any,
  Context,
  IAssignIssue
> = {
  type: Schema.nonNull(IssueType),
  args: {
    issue_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "The issue's ID",
    },
    user_id: {
      type: GraphQLInt,
      description: "The user's ID",
    },
  },
  resolve: (_: any, args) => {
    return IssueController.setAssignment(args);
  },
};

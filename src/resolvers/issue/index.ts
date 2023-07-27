import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import { IssueController } from "./IssueController";
import type { IssueQueryArgs } from "./types";

export const IssueType = new GraphQLObjectType({
  name: "issue",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (issue) => issue.id,
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (issue) => issue.status,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (issue) => issue.type,
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (issue) => issue.author,
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (issue) => issue.title,
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (issue) => issue.description,
    },
    assigned_id: {
      type: GraphQLInt,
      resolve: (issue) => issue.assigned_id,
    },
    organization_id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (issue) => issue.organization_id,
    },
    unit_id: {
      type: GraphQLInt,
      resolve: (issue) => issue.unit_id,
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (issue) => issue.created_at,
    },
  },
});

export const issue: GraphQLFieldConfig<any, any> = {
  type: IssueType,
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
  type: new GraphQLList(IssueType),
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

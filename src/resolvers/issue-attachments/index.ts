import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { Schema } from "modules/Schema";
import { AttachmentController } from "./AttachmentController";

export const IssueAttachmentType = new GraphQLObjectType({
  name: "issueAttachment",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (attachment) => attachment.id,
    },
    issue_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (attachment) => attachment.issue_id,
    },
    image_link: {
      type: Schema.nonNull(GraphQLString),
      resolve: (attachment) => attachment.image_link,
    },
    created_at: {
      type: Schema.nonNull(GraphQLString),
      resolve: (attachment) => attachment.created_at,
    },
  },
});

export const issueAttachment: GraphQLFieldConfig<any, any> = {
  type: Schema.nonNull(IssueAttachmentType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "search by primary key",
    },
  },
  resolve: (_: any, args: { id: number }) => {
    return AttachmentController.queryByID(args.id);
  },
};

export const issueAttachments: GraphQLFieldConfig<any, any> = {
  type: Schema.nonNullArray(IssueAttachmentType),
  args: {
    issue_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "search by issue_id",
    },
  },
  resolve: (_: any, args: { issue_id: number }) => {
    return AttachmentController.queryByIssueID(args.issue_id);
  },
};

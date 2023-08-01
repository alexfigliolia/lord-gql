import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from "graphql";
import { OrgController } from "./OrgController";
import type { OrgByAffiliation, OrgByID, OrgByOwner } from "./types";
import { UserType } from "resolvers/user";
import { IssueType } from "resolvers/issue";
import { PropertyType } from "resolvers/property";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";

export const OrganizationType = new GraphQLObjectType({
  name: "organization",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (org) => org.id,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (org) => org.name,
    },
    owner_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (org) => org.owner_id,
    },
    users: {
      type: Schema.nonNullArray(UserType),
      resolve: (org) => org.users,
    },
    issues: {
      type: Schema.nonNullArray(IssueType),
      resolve: (org) => org.issues,
    },
    properties: {
      type: Schema.nonNullArray(PropertyType),
      resolve: (org) => org.properties,
    },
  },
});

export const organization: GraphQLFieldConfig<any, Context, OrgByID> = {
  type: OrganizationType,
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "primary key",
    },
  },
  resolve: (_: any, { id }) => {
    return OrgController.queryByID(id);
  },
};

export const organizations: GraphQLFieldConfig<any, Context, OrgByOwner> = {
  type: new GraphQLList(OrganizationType),
  args: {
    owner_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "search by the owner's id",
    },
  },
  resolve: (_: any, { owner_id }) => {
    return OrgController.queryByOwnerID(owner_id);
  },
};

export const organizationAffiliations: GraphQLFieldConfig<
  any,
  Context,
  OrgByAffiliation
> = {
  type: new GraphQLList(OrganizationType),
  args: {
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "search by user's id",
    },
  },
  resolve: (_: any, { user_id }) => {
    return OrgController.queryByAffiliation(user_id);
  },
};

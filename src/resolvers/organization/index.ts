import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLBoolean,
} from "graphql";
import { OrgController } from "./OrgController";
import type { OrgQueryArgs } from "./types";
import { UserType } from "resolvers/user";
import { IssueType } from "resolvers/issue";
import { PropertyType } from "resolvers/property";

export const OrganizationType = new GraphQLObjectType({
  name: "organization",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (org) => org.id,
    },
    owner_id: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (org) => org.owner_id,
    },
    users: {
      type: UserType,
      resolve: (org) => org.users,
    },
    issues: {
      type: IssueType,
      resolve: (org) => org.issues,
    },
    properties: {
      type: PropertyType,
      resolve: (org) => org.properties,
    },
  },
});

export const organization: GraphQLFieldConfig<any, any> = {
  type: OrganizationType,
  args: {
    id: {
      type: GraphQLInt,
      description: "primary key",
    },
    owner_id: {
      type: GraphQLInt,
      description: "search by the owner's id",
    },
    follow_all: {
      type: GraphQLBoolean,
      description: "follow all joins",
    },
  },
  resolve: (_: any, args: OrgQueryArgs) => {
    return OrgController.routeQuery(args);
  },
};

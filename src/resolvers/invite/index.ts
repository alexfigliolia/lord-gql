import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { Schema } from "modules/Schema";
import type { Context } from "vm";
import type { AccountFromInvite, IInvite, InviteArgs } from "./types";
import { InviteController } from "./InviteController";
import { UserRole, UserType } from "resolvers/user";
import { AuthController } from "resolvers/authentication/AuthController";

export const InviteType = new GraphQLObjectType({
  name: "invite",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (invite) => invite.id,
    },
    email: {
      type: Schema.nonNull(GraphQLString),
      resolve: (invite) => invite.email,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (invite) => invite.name,
    },
    role: {
      type: Schema.nonNull(UserRole),
      resolve: (invite) => invite.role,
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (invite) => invite.organization_id,
    },
    organization_name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (invite) => invite.organization_name,
    },
  },
});

export const invites: GraphQLFieldConfig<any, Context, InviteArgs> = {
  type: Schema.nonNullArray(InviteType),
  args: {
    email: {
      type: GraphQLString,
      description: "Query by email",
    },
    organization_id: {
      type: GraphQLInt,
      description: "Query by email",
    },
  },
  resolve: (_, args) => {
    return InviteController.routeQuery(args);
  },
};

export const createInvite: GraphQLFieldConfig<any, Context, IInvite> = {
  type: InviteType,
  args: {
    name: {
      type: Schema.nonNull(GraphQLString),
      description: "The user's name",
    },
    email: {
      type: Schema.nonNull(GraphQLString),
      description: "The user's email",
    },
    role: {
      type: Schema.nonNull(UserRole),
      description: "The user's role",
    },
    organization_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "The organization's ID",
    },
    organization_name: {
      type: Schema.nonNull(GraphQLString),
      description: "The organization's name",
    },
  },
  resolve: (_, args) => {
    // TODO - email invitation
    // TODO - Email templates for new owners, residents, and employees
    return InviteController.create(args);
  },
};

export const acceptInvite: GraphQLFieldConfig<any, Context, AccountFromInvite> =
  {
    type: Schema.nonNull(UserType),
    args: {
      invite_id: {
        type: Schema.nonNull(GraphQLInt),
        description: "The invitation's primary key",
      },
      name: {
        type: Schema.nonNull(GraphQLString),
        description: "The user's name",
      },
      email: {
        type: Schema.nonNull(GraphQLString),
        description: "The user's email",
      },
      password: {
        type: Schema.nonNull(GraphQLString),
        description: "The user's password",
      },
      role: {
        type: Schema.nonNull(UserRole),
        description: "The user's role",
      },
      organization_id: {
        type: Schema.nonNull(GraphQLInt),
        description: "The organization's ID",
      },
    },
    resolve: async (_, args, context) => {
      const user = await InviteController.acceptInvite(args);
      await context.res.cookie(
        "L_User",
        AuthController.generateToken(user),
        AuthController.cookieOptions
      );
      return { user };
    },
  };

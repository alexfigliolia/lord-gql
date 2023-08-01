import { DB } from "db/Client";

export class OrgController {
  public static queryByOwnerID(ID: number) {
    return DB.organization.findMany({
      where: {
        owner_id: ID,
      },
      include: this.includes,
    });
  }

  public static queryByID(ID: number) {
    return DB.organization.findUnique({
      where: {
        id: ID,
      },
      include: this.includes,
    });
  }

  public static async queryByAffiliation(user_id: number) {
    return DB.organization.findMany({
      where: {
        users: {
          some: {
            id: user_id,
          },
        },
      },
      include: this.includes,
    });
  }

  public static createOrganization(name: string, owner: number) {
    return DB.organization.create({
      data: {
        name: name,
        owner_id: owner,
        users: { connect: { id: owner } },
      },
    });
  }

  public static addUser(user_id: number, org_id: number) {
    return DB.organization.update({
      where: {
        id: org_id,
      },
      data: {
        users: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  }

  private static get includes() {
    return {
      users: true,
      issues: {
        orderBy: {
          created_at: "desc",
        },
        include: {
          assigned: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
      properties: true,
    } as const;
  }
}

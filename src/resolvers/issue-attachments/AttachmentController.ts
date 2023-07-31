import { DB } from "db/Client";

export class AttachmentController {
  public static queryByID(id: number) {
    return DB.issueAttachment.findUnique({
      where: {
        id,
      },
    });
  }

  public static queryByIssueID(id: number) {
    return DB.issueAttachment.findMany({
      where: {
        issue_id: id,
      },
    });
  }
}

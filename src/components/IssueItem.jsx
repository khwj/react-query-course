import { GoComment, GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { Link } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";

export function IssueItem({
  id, number, title, status, labels, dueDate, createdDate, createdBy, completedDate, commentCount, assignee
}) {
  const createdByQuery = useUserData(createdBy);
  const assigneeQuery = assignee ? useUserData(assignee) : null;
  const AssigneeAvatar = ({ assignee }) => (
    <img className="assigned-to" alt={`Assigned to ${assignee.name}`} src={assignee.profilePictureUrl} />
  );

  return (
    <li>
      <div>
        {status === "done" || status === "cancelled" ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map(label =>
            <span key={label} className="label red">
              {label}
            </span>
          )}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} {createdByQuery.isSuccess ? `by ${createdByQuery.data.name}` : ""}
        </small>
      </div>
      {assignee && assigneeQuery.isSuccess ? <AssigneeAvatar assignee={assigneeQuery.data} /> : null}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment />
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
}

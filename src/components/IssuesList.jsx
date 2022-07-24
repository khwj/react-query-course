import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList() {
  const issuesQuery = useQuery(['issues'], () => fetch('/api/issues').then(res => res.json()));
  console.log(issuesQuery.data);
  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? <p>Loading...</p> : (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem
              key={issue.id}
              id={issue.id}
              number={issue.number}
              title={issue.title}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              completedDate={issue.completedDate}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              dueDate={issue.dueDate}
              labels={issue.labels}
              status={issue.todo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

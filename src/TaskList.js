import React from "react";

const TaskList = ({ tasks, onMarkAsDone, onDelete, onEdit }) => {
  const compare = (a, b) => {
    if (a.completed && !b.completed) return 1;
    if (b.completed && !a.completed) return -1;
    return 0;
  };

  return (
    <table className="table m-2">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">Done</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {tasks.sort(compare).map((task, i) => {
          return (
            <tr key={`${task.description}${i}`}>
              <th scope="row">{i + 1}</th>
              <td
                style={task.completed ? { textDecoration: "line-through" } : {}}
              >
                {task.description}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm"
                  onClick={() => onMarkAsDone(task)}
                >
                  Done
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(task)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TaskList;

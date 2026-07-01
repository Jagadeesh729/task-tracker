import API from "../api";

function TaskList({ tasks, fetchTasks }) {
 const handleDelete = async (id) => {
try {
await API.delete(`/${id}`);
fetchTasks();
} catch {
alert("Delete failed");
}
};


  const handleStatus = async (task) => {
try {
await API.put(`/${task._id}`, {
status: task.status === "Pending" ? "Completed" : "Pending"
});
fetchTasks();
} catch {
alert("Update failed");
}
};

  if (tasks.length === 0) {
    return <p style={{ textAlign: "center" }}>No tasks available</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
  Status:
  <strong style={{
    color: task.status === "Completed" ? "green" : "orange"
  }}>
    {" "}{task.status}
  </strong>
</p>


          <small>
            Created: {new Date(task.createdAt).toLocaleString()}
          </small>

          <div className="task-actions">
            <button
              className="status-btn"
              onClick={() => handleStatus(task)}
            >
              {task.status === "Pending"
                ? "Mark Complete"
                : "Mark Pending"}
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;

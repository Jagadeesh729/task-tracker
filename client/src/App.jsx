import { useEffect, useState } from "react";
import API from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    const { data } = await API.get("/");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      <div className="filter-box">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default App;

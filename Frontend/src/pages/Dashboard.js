import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  } else {
    fetchTasks();
  }
}, []);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://task-manager-backend-6y80.onrender.com/tasks",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setTasks(res.data);

    } catch (error) {
  alert(error.response?.data?.message || "Task creation failed");
     }
  };

  // create task
  const createTask = async () => {

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "https://task-manager-backend-6y80.onrender.com/tasks",
      {
        title,
        description: "New task",
        dueDate: "2026-12-31",

      },
      {
        headers: {
          Authorization: token
        }
      }
    );

    setTitle("");

    fetchTasks();

  } catch (error) {
    alert(error.response?.data?.message || "Task creation failed");
  }
};

const deleteTask = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://task-manager-backend-6y80.onrender.com/tasks/${id}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchTasks();

  } catch (error) {
    alert(error.response?.data?.message || "Delete failed");
  }
};

const completeTask = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `https://task-manager-backend-6y80.onrender.com/tasks/${id}`,
      {
        status: "completed"
      },
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchTasks();

  } catch (error) {
    alert("Update failed");
  }
};

const logout = () => {
  localStorage.removeItem("token");

  window.location.href = "/";
};

/*const userEmail = localStorage.getItem("email");*/
const filteredTasks = tasks.filter((task) => {

  const matchesSearch =
    task.title.toLowerCase().includes(
      search.toLowerCase()
    );

  const matchesFilter =
    filter === "all"
      ? true
      : task.status === filter;

  return matchesSearch && matchesFilter;
});

 return (
  <div
    style={{
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}
  >
    <h1 style={{ textAlign: "center" }}>
      Task Manager Dashboard
    </h1>

    <p style={{ textAlign: "center" }}>
      You have {tasks.length} task(s)
    </p>
     
    {/* create task */}
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          flex: 1,
          padding: "10px"
        }}
      />

      <button
        onClick={createTask}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Add Task
      </button>
    </div>

    <hr style={{ margin: "20px 0" }} />

  {/* search + filter toolbar */}
  <div
   style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  }}
>
   {/* search */}
  <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "220px",
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc"
    }}
  />
  
  {/* filter dropdown */}
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    style={{
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      cursor: "pointer"
    }}
  >
    <option value="all">All</option>
    <option value="pending">Pending</option>
    <option value="completed">Completed</option>
  </select>
</div>

    {/* show tasks */}
    {tasks.length === 0 ? (
      <p>No tasks yet. Add your first task!</p>
    ) : (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginBottom: "10px"
            }}
          >
            <span>
              {task.title} -{" "}
              <strong
                style={{
                  color:
                    task.status === "completed"
                      ? "green"
                      : "orange"
                }}
              >
                {task.status}
              </strong>
            </span>

            <div>
              <button
                onClick={() => completeTask(task.id)}
                disabled={task.status === "completed"}
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    task.status === "completed"
                      ? "#ccc"
                      : "green",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px"
                }}
              >
                Complete
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px"
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}

     {/* logout */}
     <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "flex-end"
        }}
>
      <button
        onClick={logout}
        style={{
        padding: "8px 15px",
        cursor: "pointer"
        }}
      >
       Logout
     </button>
    </div>
  </div>
 );
}

export default Dashboard;
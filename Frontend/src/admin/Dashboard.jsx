import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const API = "http://localhost:3000/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  const [editId, setEditId] = useState(null);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });



  const getTasks = async () => {
    try {
      const response = await fetch(`${API}/task/gettasks`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else if (Array.isArray(data.data)) {
        setTasks(data.data);
      }
    } catch (error) {
      console.log("Task Error:", error);
    }
  };



  const getUsers = async () => {
    try {
      const response = await fetch(`${API}/user/getusers`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (Array.isArray(data.data)) {
        setUsers(data.data);
      }
    } catch (error) {
      console.log("User Error:", error);
    }
  };

  useEffect(() => {
    getTasks();
    getUsers();
  }, []);



  const handleTaskChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };



  const handleUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };



  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId
        ? `${API}/task/update/${editId}`
        : `${API}/task/create`;

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(
        editId
          ? "Task updated successfully"
          : "Task created successfully"
      );

      setTask({
        title: "",
        description: "",
        status: "Pending",
      });

      setEditId(null);
      setShowTaskForm(false);

      getTasks();
    } catch (error) {
      alert(error.message);
    }
  };



  const editTask = (item) => {
    setTask({
      title: item.title || "",
      description: item.description || "",
      status: item.status || "Pending",
    });

    setEditId(item._id);
    setShowTaskForm(true);
  };



  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/task/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );

      alert("Task deleted");
    } catch (error) {
      alert(error.message);
    }
  };


  const handleUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API}/user/create`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "User creation failed"
        );
      }

      alert("User created successfully");

      setUser({
        name: "",
        email: "",
        password: "",
      });

      setShowUserForm(false);

      getUsers();
    } catch (error) {
      alert(error.message);
    }
  };



  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/user/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );

      alert("User deleted");
    } catch (error) {
      alert(error.message);
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };


  const pending = tasks.filter(
    (item) => item.status === "Pending"
  ).length;

  const completed = tasks.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <div className="dashboard">


      <aside className="sidebar">

        <h2>TaskFlow</h2>

        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#tasks">Tasks</a>
          <a href="#users">Users</a>
        </nav>

        <button
          className="logout"
          onClick={logout}
        >
          Logout
        </button>

      </aside>




      <main className="main">



        <header className="header">

          <div>
            <h1>Dashboard</h1>
            <p>
              Manage your tasks and users
            </p>
          </div>

    <div className="admin">
      <h3>{users[0]?.name}</h3>
    </div>




        </header>



        <section className="stats">

          <div className="stat-card">
            <span>Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>{pending}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>

          <div className="stat-card">
            <span>Users</span>
            <strong>{users.length}</strong>
          </div>

        </section>


        <section
          className="section"
          id="tasks"
        >

          <div className="section-title">

            <div >
              <h2>Tasks</h2>
              <p>Manage your tasks</p>
            </div>

            <button
              className="primary-btn"
              onClick={() => {
                setEditId(null);

                setTask({
                  title: "",
                  description: "",
                  status: "Pending",
                });

                setShowTaskForm(true);
              }}
            >
              + Add Task
            </button>

          </div>



          {showTaskForm && (

            <form
              className="form"
              onSubmit={handleTaskSubmit}
            >

              <h3>
                {editId
                  ? "Update Task"
                  : "Create Task"}
              </h3>

              <input
                type="text"
                name="title"
                placeholder="Task title"
                value={task.title}
                onChange={handleTaskChange}

              />

              <textarea
                name="description"
                placeholder="Task description"
                value={task.description}
                onChange={handleTaskChange}

              />

              <select
                name="status"
                value={task.status}
                onChange={handleTaskChange}
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

              <div className="form-buttons">

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editId
                    ? "Update"
                    : "Create"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowTaskForm(false);
                    setEditId(null);
                  }}
                >
                  Cancel
                </button>

              </div>

            </form>

          )}




          <div className="table-box">

            <table>

              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {tasks.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="empty"
                    >
                      No tasks found
                    </td>
                  </tr>

                ) : (

                  tasks.map((item, index) => (

                    <tr key={item._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <b>{item.title}</b>
                      </td>

                      <td>
                        {item.description}
                      </td>

                      <td>

                        <span
                          className={`status ${item.status
                            ?.toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="edit"
                          onClick={() =>
                            editTask(item)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete"
                          onClick={() =>
                            deleteTask(
                              item._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>



        <section
          className="section"
          id="users"
        >

          <div className="section-title">

            <div style={{ width: "100%", backgroundColor: "green", padding: "6px" }}>
              <h2 >Users</h2>

            </div>


          </div>



          <div className="table-box">

            <table>

              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {users.length === 0 ? (

                  <tr>
                    <td
                      colSpan="4"
                      className="empty"
                    >
                      No users found
                    </td>
                  </tr>

                ) : (

                  users.map((item, index) => (

                    <tr key={item._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <b>{item.name}</b>
                      </td>

                      <td>
                        {item.email}
                      </td>

                      <td>

                        <button
                          className="delete"
                          onClick={() =>
                            deleteUser(
                              item._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Dashboard;
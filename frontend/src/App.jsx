import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const API_USER = import.meta.env.VITE_API_USER;

  // Fetch users from backend
  const getData = async () => {
    try {
      const res = await axios.get(API_USER);
      setUsers(res.data);
    } catch (error) {
      alert("Users not found");
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle create / update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing user
        await axios.put(`${API_USER}/${editId}`, {
          name,
          email,
          password,
        });
        setEditId(null);
      } else {
        // Create new user
        await axios.post(API_USER, {
          name,
          email,
          password,
        });
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");

      // Refresh list
      getData();
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Error: check console");
    }
  };

  // Delete user
  const deleted = async (_id) => {
    try {
      await axios.delete(`${API_USER}/${_id}`);
      setUsers((prev) => prev.filter((user) => user._id !== _id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Todo List</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            {editId ? "Update User" : "Add User"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setName("");
                setEmail("");
                setPassword("");
              }}
              className="mt-2 w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel Edit
            </button>
          )}
        </form>

        <ul className="mt-6 space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="bg-white p-4 flex justify-between items-center rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditId(user._id);
                    setName(user.name);
                    setEmail(user.email);
                    setPassword(user.password);
                  }}
                  className="bg-green-400 rounded-md py-2 px-4 hover:bg-green-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleted(user._id)}
                  className="bg-red-400 rounded-md py-2 px-4 hover:bg-red-500 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

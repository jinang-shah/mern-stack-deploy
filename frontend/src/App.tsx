import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  age: number;
}

const API_URL = import.meta.env.VITE_API_URL; // Get API URL from .env file

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users`) // Backend URL
      .then((response: any) => setUsers(response.data))
      .catch((error: any) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 MERN Stack App</h1>
      <h2>Fetched Users:</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            {user.name} - {user.email} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import UsersService from "../api/UsersService";
import Spinner from "../components/Spinner";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    UsersService.getAll()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Age</th><th>City</th>
          <th>State</th><th>Pincode</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.age}</td>
            <td>{u.city}</td>
            <td>{u.state}</td>
            <td>{u.pincode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import "./styles/app.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "../api/UsersService";
import userSchema from "../validation/userSchema";
import Toast from "../components/Toast";

export default function AddUser() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "", age: "", city: "", state: "", pincode: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userSchema.validate(form, { abortEarly: false });

      await UsersService.create({
        ...form,
        age: Number(form.age)
      });

      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      if (err.inner) {
        const mappedErrors = {};
        err.inner.forEach(e => {
          mappedErrors[e.path] = e.message;
        });
        setErrors(mappedErrors);
      } else {
        alert(err.message);
      }
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      {success && <Toast message="User added successfully!" />}

      <input name="name" placeholder="Name" onChange={handleChange} />
      <div className="error">{errors.name}</div>

      <input name="age" type="number" placeholder="Age" onChange={handleChange} />
      <div className="error">{errors.age}</div>

      <input name="city" placeholder="City" onChange={handleChange} />
      <div className="error">{errors.city}</div>

      <input name="state" placeholder="State" onChange={handleChange} />
      <div className="error">{errors.state}</div>

      <input name="pincode" placeholder="Pincode" onChange={handleChange} />
      <div className="error">{errors.pincode}</div>

      <button type="submit">Save</button>
    </form>
  );
}

import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  age: yup
    .number()
    .required("Age is required")
    .min(0, "Age must be >= 0")
    .max(120, "Age must be <= 120"),

  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),

  pincode: yup
    .string()
    .required("Pincode is required")
    .min(4, "Pincode must be 4–10 characters")
    .max(10, "Pincode must be 4–10 characters"),
});

export default userSchema;

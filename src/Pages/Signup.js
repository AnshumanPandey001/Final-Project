import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationError({ ...validationError, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    if (formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character.";
    }
    setValidationError(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("❌ something went wrong.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5271/api/Signup", formData);
      toast.success("✅ Registration Successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup Failed. Please try again.";
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className="flex items-center justify-end min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1111318/pexels-photo-1111318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <ToastContainer />
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md mr-12">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 mb-2 border rounded-lg focus:ring-2 ${
              validationError.name ? "border-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Enter your full name"
          />
          {validationError.name && <p className="text-red-500 text-sm mb-4">{validationError.name}</p>}

          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 mb-2 border rounded-lg focus:ring-2 ${
              validationError.email ? "border-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Enter your email"
          />
          {validationError.email && <p className="text-red-500 text-sm mb-4">{validationError.email}</p>}

          <label className="block mb-2 font-semibold text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 mb-2 border rounded-lg focus:ring-2 ${
                validationError.password ? "border-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {validationError.password && <p className="text-red-500 text-sm mb-4">{validationError.password}</p>}

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-500 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

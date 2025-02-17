import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationError({ ...validationError, [name]: "" }); // Clear field-specific error on change
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    setValidationError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5271/api/Login", {
        email: formData.email,
        password: formData.password,
      });
      alert(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error during login");
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
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md mx-8 sm:mx-16 md:mx-32 lg:mx-48 lg:mr-20">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 ${
              validationError.email ? "border-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Enter your email"
          />
          {validationError.email && (
            <p className="text-red-500 text-sm mb-4">{validationError.email}</p>
          )}

          {/* Password Input */}
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 ${
              validationError.password ? "border-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Enter your password"
          />
          {validationError.password && (
            <p className="text-red-500 text-sm mb-4">{validationError.password}</p>
          )}

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-1/3"></div>
          <p className="mx-2 text-gray-600 text-sm">OR</p>
          <div className="border-t border-gray-300 w-1/3"></div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-blue-500 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

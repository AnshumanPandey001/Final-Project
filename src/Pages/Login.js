import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
// import { UserContext } from "../context/UserContext"; // Import context for updating user state

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // For login success
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  // const { setUserName } = useContext(UserContext); // Use context to update header username
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationError({ ...validationError, [name]: "" });
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

      // Save user name in localStorage for Header display
      localStorage.setItem("userName", response.data.userName);
      // setUserName(response.data.userName); // Update context to reflect in Header
      
      // Show success message with animation
      setSuccessMessage("Login Successful! Redirecting...");
      setTimeout(() => {
        navigate("/Home"); // Redirect to home after success
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error during login");
    }
  };

  return (
    <div className="flex items-center justify-end min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/1111318/pexels-photo-1111318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
      
      {/* Animated Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
        >
          {successMessage}
        </motion.div>
      )}

      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md mx-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-2 border rounded-lg focus:ring-blue-500"
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
              required
              className="w-full px-4 py-2 mb-2 border rounded-lg focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {validationError.password && <p className="text-red-500 text-sm mb-4">{validationError.password}</p>}

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

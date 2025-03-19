import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationError({ ...validationError, [name]: "" });
  };

  // Form Validation
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

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5271/api/Admin/login", {
        email: formData.email,
        password: formData.password, // ✅ Corrected key
      });

      // Save admin name in localStorage
      localStorage.setItem("adminName", response.data.adminName); // ✅ Match API response

      // Dispatch event for UI update
      window.dispatchEvent(new Event("adminLoggedIn"));

      // Show success toast and redirect
      toast.success("Login Successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });

      setTimeout(() => {
        navigate("/AdminDashboard");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="flex items-center justify-end min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/1111318/pexels-photo-1111318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
      
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md mx-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Admin Login</h2>

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

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;

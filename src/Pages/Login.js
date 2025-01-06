import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Signup from "./Signup";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false, // "Remember Me" state
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/login", {
                email: formData.email,
                password: formData.password,
                rememberMe: formData.rememberMe,
            });
            alert(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div
            className="flex items-center justify-end min-h-screen pr-8 bg-cover bg-center"
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/1111318/pexels-photo-1111318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", // Background image URL
            }}
        >
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-semibold" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block mb-2 font-semibold" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center text-sm text-gray-600">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 text-blue-500"
                            />
                            <span className="ml-2">Remember Me</span>
                        </label>
                        <a href="#" className="text-blue-500 text-sm hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                {/* OR Divider */}
                <div className="flex items-center justify-center my-4">
                    <div className="border-t border-gray-300 w-1/3"></div>
                    <p className="mx-2 text-gray-600 text-sm">OR</p>
                    <div className="border-t border-gray-300 w-1/3"></div>
                </div>
                {/* Login with Google */}
                <button
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M22.675 11.861H12.178v2.868h5.925c-.534 2.566-2.774 3.996-5.918 3.996-3.578 0-6.479-2.9-6.479-6.479s2.9-6.479 6.479-6.479c1.498 0 2.869.524 3.946 1.391l2.354-2.354C16.57 2.822 14.503 2 12.178 2 6.5 2 2 6.5 2 12.178s4.5 10.178 10.178 10.178c5.287 0 9.7-4.213 9.7-9.7 0-.43-.044-.857-.121-1.273z" />
                    </svg>
                    Login with Google
                </button>
                {/* Signup Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <Link to="/Signup" className="text-blue-500 hover:underline font-medium">
                    Signup
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

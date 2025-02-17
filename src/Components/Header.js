import React, { useState, useEffect } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../Images/logo_crowdfund.jpg";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userName, setUserName] = useState(""); // To store logged-in username
    const navigate = useNavigate();
    const location = useLocation(); // To get the current route

    // Function to toggle the menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Check if the user is logged in
    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        if (storedUser) {
            setUserName(storedUser);
        }
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("userName"); // Remove user data
        setUserName(""); // Reset state
        navigate("/login"); // Redirect to login page
    };

    // Function to dynamically apply active class based on the current page
    const getLinkClass = (path) => {
        return location.pathname === path
            ? "text-teal-600 font-bold"
            : "text-gray-700 hover:text-teal-600";
    };

    return (
        <header className="bg-ivory shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-12 h-12 object-cover rounded-full"
                    />
                    <h1 className="text-2xl font-bold text-gray-700 tracking-wide">
                        Crowdfund
                    </h1>
                </div>

                {/* Search Bar (Hidden on small screens) */}
                <div className="relative flex-1 mx-6 hidden md:block">
                    <input
                        type="text"
                        placeholder="Search fundraisers..."
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                    />
                    <FaSearch className="absolute top-2 right-4 text-gray-500 text-xl" />
                </div>

                {/* Navigation Section (Desktop and Tablet) */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/Home" className={`text-lg font-medium transition ${getLinkClass("/Home")}`}>
                        Home
                    </Link>
                    <Link to="/donate" className={`text-lg font-medium transition ${getLinkClass("/donate")}`}>
                        Donate
                    </Link>
                    <Link to="/ContactUs" className={`text-lg font-medium transition ${getLinkClass("/ContactUs")}`}>
                        Contact Us
                    </Link>
                    <Link to="/start-fundraiser" className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold shadow-md hover:bg-teal-400 hover:text-white transition">
                        Start a Fundraiser
                    </Link>

                    {/* If user is logged in, show Name and Logout button */}
                    {userName ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 text-lg font-medium">
                                Welcome, {userName}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        // Show Login/Signup buttons if user is not logged in
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition">
                                <FaUser className="mr-2" />
                                Login
                            </Link>
                            <Link to="/signup" className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition">
                                <FaUser className="mr-2" />
                                Signup
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Button (Hamburger Icon) */}
                <div className="md:hidden flex items-center ml-4">
                    <button onClick={toggleMenu} className="flex flex-col space-y-2" aria-label="Toggle mobile menu">
                        <div className={`h-1 w-6 bg-teal-500 rounded-lg transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
                        <div className={`h-1 w-6 bg-teal-500 rounded-lg transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}></div>
                        <div className={`h-1 w-6 bg-teal-500 rounded-lg transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu (when Hamburger is clicked) */}
            {menuOpen && (
                <div className="md:hidden bg-ivory p-4 space-y-4">
                    <Link to="/Home" className={`block text-lg transition ${getLinkClass("/Home")}`} onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>
                    <Link to="/donate" className={`block text-lg transition ${getLinkClass("/donate")}`} onClick={() => setMenuOpen(false)}>
                        Donate
                    </Link>
                    <Link to="/ContactUs" className={`block text-lg transition ${getLinkClass("/ContactUs")}`} onClick={() => setMenuOpen(false)}>
                        Contact Us
                    </Link>
                    <Link to="/start-fundraiser" className="block bg-white text-teal-600 px-4 py-2 rounded-full font-bold shadow-md hover:bg-teal-400 hover:text-white transition" onClick={() => setMenuOpen(false)}>
                        Start a Fundraiser
                    </Link>

                    {/* If user is logged in, show Name and Logout button */}
                    {userName ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 text-lg font-medium">
                                Welcome, {userName}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        // Show Login/Signup buttons if user is not logged in
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition" onClick={() => setMenuOpen(false)}>
                                <FaUser className="mr-2" />
                                Login
                            </Link>
                            <Link to="/signup" className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition" onClick={() => setMenuOpen(false)}>
                                <FaUser className="mr-2" />
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;

import React, { useState } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../Images/logo_crowdfund.jpg";




const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to toggle the menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
                    <Link
                        to="/Home"
                        className="text-gray-700 text-lg font-medium hover:text-teal-600 transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/donate"
                        className="text-gray-700 text-lg font-medium hover:text-teal-600 transition"
                    >
                        Donate
                    </Link>
                    <Link
                        to="/ContactUs"
                        className="text-gray-700 text-lg font-medium hover:text-teal-600 transition"
                    >
                        Contact Us
                    </Link>
                    {/* Updated the button to link to FundraiserForm */}
                    <Link
                        to="/start-fundraiser"
                        className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold shadow-md hover:bg-teal-400 hover:text-white transition"
                    >
                        Start a Fundraiser
                    </Link>

                    {/* Login/Signup Section (Always visible) */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"
                        >
                            <FaUser className="mr-2" />
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"
                        >
                            <FaUser className="mr-2" />
                            Signup
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button (Hamburger Icon) */}
                <div className="md:hidden flex items-center ml-4">
                    <button
                        onClick={toggleMenu}
                        className="flex flex-col space-y-2"
                        aria-label="Toggle mobile menu"
                    >
                        <div
                            className={`h-1 w-6 bg-teal-500 rounded-lg transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                        ></div>
                        <div
                            className={`h-1 w-6 bg-teal-500 rounded-lg transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
                        ></div>
                        <div
                            className={`h-1 w-6 bg-teal-500 rounded-lg transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                        ></div>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`md:hidden bg-white shadow-md transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col px-6 py-4 space-y-4">
                    <Link
                        to="/Home"
                        className="text-gray-700 text-lg font-medium hover:text-teal-600"
                    >
                        Home
                    </Link>
                    <Link
                        to="/donate"
                        className="text-gray-700 text-lg font-medium hover:text-teal-600"
                    >
                        Donate
                    </Link>
                    <Link
                        to="/ContactUs"
                        className="text-gray-700 text-lg font-medium hover:text-teal-600"
                    >
                        Contact Us
                    </Link>
                    <Link
                        to="/FundraiserForm"
                        className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold shadow-md hover:bg-teal-400 hover:text-white"
                    >
                        Start a Fundraiser
                    </Link>
                    <div className="flex flex-col space-y-2">
                        <Link
                            to="/login"
                            className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"
                        >
                            <FaUser className="mr-2" />
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"
                        >
                            <FaUser className="mr-2" />
                            Signup
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

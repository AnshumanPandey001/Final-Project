import React, { useState, useEffect } from "react";
import { FaUser, FaSearch, FaTachometerAlt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../Images/logo_crowdfund.jpg";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [allFundraisers, setAllFundraisers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Toggle mobile menu and user menu
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

    // Update user name from localStorage
    useEffect(() => {
        const updateUser = () => {
            setUserName(localStorage.getItem("userName") || "");
        };
        window.addEventListener("userLoggedIn", updateUser);
        return () => window.removeEventListener("userLoggedIn", updateUser);
    }, []);

    // Fetch all fundraisers on component mount
    useEffect(() => {
        const fetchAllFundraisers = async () => {
            try {
                const response = await fetch("http://localhost:5271/api/Fundraiser");
                if (!response.ok) throw new Error("Failed to fetch fundraisers");
                const data = await response.json();
                setAllFundraisers(data);
            } catch (err) {
                console.error("Error fetching fundraisers:", err);
            }
        };
        fetchAllFundraisers();
    }, []);

    // Handle search input
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setSearchResults([]);
            return;
        }

        const filteredResults = allFundraisers.filter((fundraiser) =>
            [
                fundraiser.fundraiserName?.toLowerCase(),
                fundraiser.mobileNumber,
                fundraiser.city?.toLowerCase(),
                fundraiser.location?.toLowerCase(),
            ].some((field) => field?.includes(value.toLowerCase()))
        );
        setSearchResults(filteredResults);
    };

    // Handle clicking a search result
    const handleResultClick = (fundraiserId) => {
        setSearchTerm("");
        setSearchResults([]);
        navigate(`/fundraiser/${fundraiserId}`);
    };

    const handleLogout = () => {
        localStorage.removeItem("userName");
        setUserName("");
        setUserMenuOpen(false);
        navigate("/login");
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const getLinkClass = (path) =>
        location.pathname === path ? "text-teal-600 font-bold" : "text-gray-700 hover:text-teal-600";

    return (
        <header className="bg-ivory shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="w-12 h-12 object-cover rounded-full" />
                    <h1 className="text-2xl font-bold text-gray-700 tracking-wide">Crowdfund</h1>
                </div>

                {/* Desktop Search Bar */}
                <div className="relative flex-1 mx-6 hidden md:block">
                    <input
                        type="text"
                        placeholder="   Search fundraisers"
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FaSearch className="absolute top-2 right-4 text-gray-500 text-xl" />

                    {/* Search Results Dropdown */}
                    {searchResults.length > 0 && (
                        <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                            {searchResults.map((fundraiser) => (
                                <div
                                    key={fundraiser.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleResultClick(fundraiser.id)}
                                >
                                    <p className="font-semibold">{fundraiser.fundraiserName || "N/A"}</p>
                                    <p className="text-sm text-gray-600">
                                        {fundraiser.city || "N/A"}, {fundraiser.location || "N/A"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Hamburger Icon for Mobile */}
                <button
                    onClick={toggleMenu}
                    className={`md:hidden text-2xl text-gray-700 transition-all duration-300 ${menuOpen ? "rotate-90" : ""}`}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Desktop Menu */}
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
                    <Link
                        to="/start-fundraiser"
                        className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold shadow-md hover:bg-teal-400 hover:text-white transition"
                    >
                        Start a Fundraiser
                    </Link>

                    {userName ? (
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-full shadow-md hover:bg-gray-300 transition"
                            >
                                <span className="text-gray-700 text-lg font-medium">Welcome, {userName}</span>
                            </button>
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                                    <Link
                                        to="/UserDashboard"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        <FaTachometerAlt className="mr-2" /> My Dashboard
                                    </Link>
                                    <Link
                                        to="/UserProfile"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        <FaUser className="mr-2" /> My Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                                    >
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"
                            >
                                <FaUser className="mr-2" /> Login
                            </Link>
                            <Link
                                to="/signup"
                                className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"
                            >
                                <FaUser className="mr-2" /> Signup
                            </Link>
                        </div>
                    )}
                </nav>
            </div>

            {/* Mobile Menu (Dropdown) */}
            {menuOpen && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                    <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50 transition-all transform ease-in-out duration-300">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold">Menu</h2>
                            <button onClick={toggleMenu} className="text-2xl text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <nav className="flex flex-col items-center space-y-4 py-4">
                            <Link
                                to="/Home"
                                className={`text-lg font-medium ${getLinkClass("/Home")}`}
                                onClick={handleLinkClick}
                            >
                                Home
                            </Link>
                            <Link
                                to="/donate"
                                className={`text-lg font-medium ${getLinkClass("/donate")}`}
                                onClick={handleLinkClick}
                            >
                                Donate
                            </Link>
                            <Link
                                to="/ContactUs"
                                className={`text-lg font-medium ${getLinkClass("/ContactUs")}`}
                                onClick={handleLinkClick}
                            >
                                Contact Us
                            </Link>
                            <Link
                                to="/start-fundraiser"
                                className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold shadow-md hover:bg-teal-400 hover:text-white transition"
                                onClick={handleLinkClick}
                            >
                                Start a Fundraiser
                            </Link>

                            {userName ? (
                                <div className="relative mt-4">
                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-full shadow-md hover:bg-gray-300 transition"
                                    >
                                        <span className="text-gray-700 text-lg font-medium">Welcome, {userName}</span>
                                    </button>
                                    {userMenuOpen && (
                                        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md overflow-hidden">
                                            <Link
                                                to="/UserDashboard"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                <FaTachometerAlt className="mr-2" /> My Dashboard
                                            </Link>
                                            <Link
                                                to="/UserProfile"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                <FaUser className="mr-2" /> My Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                                            >
                                                <FaSignOutAlt className="mr-2" /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4 mt-4">
                                    <Link
                                        to="/login"
                                        className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"
                                    >
                                        <FaUser className="mr-2" /> Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"
                                    >
                                        <FaUser className="mr-2" /> Signup
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
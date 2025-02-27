import React, { useState, useEffect } from "react";
import { FaUser, FaSearch, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../Images/logo_crowdfund.jpg";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem("userName") || ""); 
    const navigate = useNavigate();
    const location = useLocation(); 

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

    // Update username dynamically when user logs in
    useEffect(() => {
        const updateUser = () => {
            setUserName(localStorage.getItem("userName") || "");
        };
    
        window.addEventListener("userLoggedIn", updateUser);
        
        return () => window.removeEventListener("userLoggedIn", updateUser);
    }, []);
    

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("userName");
        setUserName(""); 
        setUserMenuOpen(false);
        navigate("/login");
    };

    // Active link styling
    const getLinkClass = (path) => (
        location.pathname === path ? "text-teal-600 font-bold" : "text-gray-700 hover:text-teal-600"
    );

    return (
        <header className="bg-ivory shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="w-12 h-12 object-cover rounded-full" />
                    <h1 className="text-2xl font-bold text-gray-700 tracking-wide">Crowdfund</h1>
                </div>

                <div className="relative flex-1 mx-6 hidden md:block">
                    <input type="text" placeholder="Search fundraisers..." className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                    <FaSearch className="absolute top-2 right-4 text-gray-500 text-xl" />
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/Home" className={`text-lg font-medium transition ${getLinkClass("/Home")}`}>Home</Link>
                    <Link to="/donate" className={`text-lg font-medium transition ${getLinkClass("/donate")}`}>Donate</Link>
                    <Link to="/ContactUs" className={`text-lg font-medium transition ${getLinkClass("/ContactUs")}`}>Contact Us</Link>
                    <Link to="/start-fundraiser" className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold shadow-md hover:bg-teal-400 hover:text-white transition">Start a Fundraiser</Link>

                    {userName ? (
                        <div className="relative">
                            <button onClick={toggleUserMenu} className="flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-full shadow-md hover:bg-gray-300 transition">
                                <span className="text-gray-700 text-lg font-medium">Welcome, {userName}</span>
                            </button>
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                                    <Link to="/UserDashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><FaTachometerAlt className="mr-2" /> My Dashboard</Link>
                                    <Link to="/UserProfile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><FaUser className="mr-2" /> My Profile</Link>
                                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"><FaSignOutAlt className="mr-2" /> Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"><FaUser className="mr-2" />Login</Link>
                            <Link to="/signup" className="flex items-center bg-teal-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-teal-500 transition"><FaUser className="mr-2" />Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;

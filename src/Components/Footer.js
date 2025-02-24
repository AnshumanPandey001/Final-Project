import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import ReviewSection from "../Pages/Review";

const Footer = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Company Information */}
        <h2 className="text-lg font-bold">Crowdfund</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div>
            <h3 className="font-semibold">About</h3>
            <ul className="text-gray-400">
              <li><Link to="/AboutUs">About us</Link></li>
              {/* <li><a href="#">Press and media</a></li> */}
              <li><Link to="/TeamPage">Team</Link></li>
              {/* <li><a href="#">Careers</a></li> */}
              <li><Link to="/contactUs">Contact</Link></li>
              {/* <li><Link to="/thank-you">Thank you</Link></li> */}
              {/* <li><a href="#">Resources</a></li> */}
            </ul>
          </div>

          {/* Office Address */}
          <div>
            <h3 className="font-semibold">Indian Office Address</h3>
            <p className="text-gray-400">
              Crowdfund Social Ventures India<br />
              Goregaon East <br />
              Mumbai, India 400065
            </p>
          </div>

          {/* Payment Support */}
          <div>
            <h3 className="font-semibold">Supported by</h3>
            {/* <div className="flex space-x-2 mt-2">
              <img src="visa-logo.png" alt="Visa" className="h-6" />
              <img src="mastercard-logo.png" alt="MasterCard" className="h-6" />
              <img src="paytm-logo.png" alt="Paytm" className="h-6" />
              <img src="amex-logo.png" alt="American Express" className="h-6" />
            </div> */}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <button onClick={() => navigate("/start-fundraiser")}
            className="bg-red-600 px-6 py-2 rounded-full font-bold">
            Start a fundraiser
          </button>
        </div>

        {/* Additional Links */}
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition">Pricing</a>
          <span className="text-gray-400">|</span>
          <Link to="/ReviewSection" className="text-gray-400 hover:text-white transition">Reviews</Link>
          <span className="text-gray-400">|</span>
          <a href="#" className="text-gray-400 hover:text-white transition">FAQs and Tips</a>
        </div>

        {/* Social Media Icons */}
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaYoutube size={20} /></a>
        </div>

        {/* Copyright Info */}
        <p className="mt-4 text-gray-400">&copy; {new Date().getFullYear()} Fundraise. All rights reserved.</p>
        <p className="text-gray-400">Built with ❤️ by Anshuman.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import Payment_img from "../Images/payment_img.jpg";

const Footer = () => {
  const navigate = useNavigate();

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
              <li><Link to="/TeamPage">Team</Link></li>
              <li><Link to="/contactUs">Contact</Link></li>
              <li><Link to="/AdminLogin">Login for Admin</Link></li>
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
            <div className="mt-2">
              <img 
                src={Payment_img}
                alt="Supported by Visa, MasterCard, Paytm, and American Express"
                className="h-auto w-full max-w-xs mx-auto"
              />
            </div>
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

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Fundraise. All rights reserved.</p>
        <p className="text-gray-400 mt-2">Built with ❤️ by Anshuman.</p>
        <div className="mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition px-4"
          >
            Privacy Policy
          </a>
          |
          <a
            href="#"
            className="text-gray-400 hover:text-white transition px-4"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

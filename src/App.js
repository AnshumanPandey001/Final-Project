import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import FundraiserCards from "./Components/FundraiserCards";
import FundraiserDetails from "./Components/FundraiserDetail"; // Import the new details page
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import FundraiserForm from "./Components/FundraiserForm";
import ContactUs from './Pages/ContactUs';
import Donate from "./Pages/Donate";
import Home from "./Pages/Home";
import TeamPage from "./Pages/TeamPage";
import AboutUs from "./Pages/AboutUs";
import ReviewSection from "./Pages/Review";
import UserDashboard from "./Pages/UserDashboard";
import UserProfile from "./Pages/UserProfile";
import AdminDashboard from "./Pages/Admin";
import PaymentPage from "./Components/PaymentPage";
import AdminLogin from "./Pages/Admin_Login";



const App = () => {
  const [cards, setCards] = useState([]); // Centralized state for fundraiser cards

  // Function to handle form submission and update cards
  const handleAddCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          {/* Default route should be Home */}
          <Route path="/" element={<Home cards={cards} />} />
          <Route path="/Home" element={<Home cards={cards} />} />
         

          {/* Route to display fundraiser cards */}
          <Route path="/fundraiserCards" element={<FundraiserCards cards={cards} />} />
          
          {/* Route to show details of a specific fundraiser */}
          <Route path="/fundraiser-details/:index" element={<FundraiserDetails cards={cards} />} />

          {/* Route to show the FundraiserForm for creating a fundraiser */}
          <Route
            path="/start-fundraiser"
            element={<FundraiserForm onAddCard={handleAddCard} />}
          />
          
          {/* Other routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/TeamPage" element={<TeamPage/>} />
          <Route path="/AboutUS" element={<AboutUs/>} />
          <Route path="/ReviewSection" element={<ReviewSection/>} />
          <Route path="/UserDashboard" element={<UserDashboard/>} />
          <Route path="/UserProfile" element={<UserProfile/>} />
          <Route path="/AdminDashboard" element={<AdminDashboard/>} />
          <Route path="/PaymentPage" element={<PaymentPage/>} />
          <Route path="/AdminLogin" element={<AdminLogin/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

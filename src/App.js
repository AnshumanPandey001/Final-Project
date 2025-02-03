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
          <Route path="/home" element={<Home cards={cards} />} />

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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

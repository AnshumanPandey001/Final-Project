import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import FundraiserCards from "./Components/FundraiserCards";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import FundraiserForm from "./Components/FundraiserForm";
import ContactUs from './Pages/ContactUs'; // Correct case-sensitive import
import Donate from "./Pages/Donate";
import Home from "./Pages/Home"; // Ensure correct import

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
          <Route path="/Home" element={<Home />} /> {/* Home page route */}
          
          {/* Other routes */}
          <Route path="/fundraiserCards" element={<FundraiserCards cards={cards} />} />
          <Route
            path="/start-fundraiser"
            element={<FundraiserForm onAddCard={handleAddCard} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contactUs" element={<ContactUs />} /> {/* Contact Us page route */}
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

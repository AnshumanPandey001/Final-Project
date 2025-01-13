import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import FundraiserCards from "./Components/FundraiserCards";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import FundraiserForm from "./Components/FundraiserForm"; // Updated import path for FundraiserForm

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<FundraiserCards />} />
        <Route path="/start-fundraiser" element={<FundraiserForm />} /> {/* Route to FundraiserForm */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

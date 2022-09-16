import React from "react";
import { Container } from "react-bootstrap";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import CategoryDetails from "./components/CategoryDetails";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories/:category" element={<CategoryDetails />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/HomePage"
          element={<ProtectedRoute path="/HomePage" element={<HomePage />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

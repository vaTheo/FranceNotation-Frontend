import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import MainPage from "./pages/mainPage";
import ResultPage from "./pages/results";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/resultpage" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

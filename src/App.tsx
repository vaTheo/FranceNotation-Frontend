import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import ResultPage from "./pages/results";
import { useError } from "./components/errorContext/errorContext";
import { useEffect } from "react";
import { attachInterceptors } from "./utils/axiosInstance";

function App() {
  const { showError } = useError();
  useEffect(() => {
    attachInterceptors(showError);
  }, [showError]);
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

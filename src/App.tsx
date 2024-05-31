import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import ResultPage from "./pages/results";
import { useError } from "./components/errorContext/errorContext";
import { useEffect } from "react";
import { attachInterceptors } from "./utils/axiosInstance";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";

function App() {
  const { showError } = useError();
  useEffect(() => {
    attachInterceptors(showError);
  }, [showError]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/resultpage" element={<ResultPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

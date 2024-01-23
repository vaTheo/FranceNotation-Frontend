import "./styles/App.scss";
import MainPage from "./pages/mainPage";
import { useEffect } from "react";
import axios from "axios";
import TestPage from "./pages/test";

function App() {
  return (
    <div>
      <TestPage />
    </div>
  );
}
export default App;

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./store/Theme.jsx";
import App from "./App.jsx";
//import "./index.css";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
          <App />
    </ThemeProvider>
  </BrowserRouter>
);

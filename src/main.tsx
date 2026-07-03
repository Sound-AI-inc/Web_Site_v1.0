import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import { initAnalytics } from "./lib/analytics";

function Root() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);

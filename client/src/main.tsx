import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Disable Vite's error overlay in development
if (import.meta.env.DEV) {
  window.addEventListener('error', (e) => {
    if (e.message.includes('Failed to fetch')) {
      e.preventDefault();
      console.warn('Fetch error suppressed:', e.message);
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
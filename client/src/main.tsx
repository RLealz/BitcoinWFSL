import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Disable Vite's error overlay in development
if (import.meta.env.DEV) {
  console.debug('HMR overlay disabled:', import.meta.env.VITE_HMR_OVERLAY === 'false');

  // Handle synchronous errors
  window.addEventListener('error', (e) => {
    if (e.message.includes('Failed to fetch')) {
      e.preventDefault();
      console.warn('Fetch error suppressed:', e.message);
    }
  });

  // Handle promise rejections
  window.addEventListener("unhandledrejection", (e) => {
    if (e.reason && typeof e.reason === "object" && e.reason.message && 
        e.reason.message.includes("Failed to fetch")) {
      e.preventDefault();
      console.warn("Unhandled rejection suppressed:", e.reason.message);
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Disable Vite's error overlay in development
if (import.meta.env.DEV) {
  console.debug('HMR overlay disabled:', import.meta.env.VITE_HMR_OVERLAY === 'false');

  // Handle synchronous errors
  window.addEventListener('error', (e) => {
    if (e.message.includes('Failed to fetch') || 
        e.filename?.includes('recaptcha') || 
        e.filename?.includes('gstatic')) {
      e.preventDefault();
      console.warn('Fetch error suppressed:', e.message);
    }
  });

  // Handle promise rejections
  window.addEventListener("unhandledrejection", (e) => {
    if (e.reason && typeof e.reason === "object" && e.reason.message && 
        (e.reason.message.includes("Failed to fetch") ||
         e.reason.stack?.includes("recaptcha") ||
         e.reason.stack?.includes("gstatic"))) {
      e.preventDefault();
      console.warn("Unhandled rejection suppressed:", e.reason.message);
    }
  });

  // Handle HMR errors
  if (import.meta.hot) {
    import.meta.hot.on("error", (err: any) => {
      if (err?.message && (err.message.includes("Failed to fetch") ||
          err.stack?.includes("recaptcha") ||
          err.stack?.includes("gstatic"))) {
        console.warn("Suppressed HMR error:", err.message);
        return; // Prevent further handling
      }
    });
  }

  // Add DOM mutation observer to remove error overlays
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node instanceof HTMLElement &&
          (node.id === "vite-error-overlay" || 
           node.classList.contains("runtime-error-overlay") ||
           node.classList.contains("eruda-error-stack")) &&
          (node.innerText.includes("Failed to fetch") ||
           node.innerText.includes("recaptcha") ||
           node.innerText.includes("gstatic"))
        ) {
          console.warn("Removing error overlay node");
          node.remove();
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

createRoot(document.getElementById("root")!).render(<App />);
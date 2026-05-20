import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";
import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 2000,

        style: {
          borderRadius: "12px",
          background: "#ffffff",
          color: "#0f172a",
          padding: "10px 12px",
        },

        success: {
          style: {
            background: "#ffffff",
            color: "#000000",
          },
        },

        error: {
          style: {
            background: "#ffffff",
            color: "#000000",
          },
        },
      }}
    />

    <App />
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import App from "@/src/App";
import "@/src/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <App />
        <Toaster
          position="top-center"
          richColors
          expand
          visibleToasts={3}
          gap={12}
          toastOptions={{
            duration: 3000,
            closeButton: true,
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

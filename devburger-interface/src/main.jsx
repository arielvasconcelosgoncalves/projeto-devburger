import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styles/globalStyles";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Router } from "./routes";
import { AppProvider } from "./hooks";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "./config/stripeConfig";
import { ThemeProvider } from "styled-components";
import { standardTheme } from "./styles/themes/standard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <GlobalStyles />
          <ToastContainer autoClose={2000} theme="colored" />
        </Elements>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FiltersProvider } from "./context/FiltersProvider";
import { EmploymentAPIProvider } from "./context/EmploymentAPIProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FiltersProvider>
      <EmploymentAPIProvider>
        <App />
      </EmploymentAPIProvider>
    </FiltersProvider>
  </StrictMode>
);

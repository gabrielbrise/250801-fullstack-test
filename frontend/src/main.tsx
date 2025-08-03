import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FiltersProvider } from "./context/FiltersProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </StrictMode>
);

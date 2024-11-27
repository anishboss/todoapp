import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TodoProvider } from "./contexts/TodoContext.tsx";
import AppRouter from "./routes/AppRouter.tsx";
import { SunriseFormProvider } from "./contexts/FormContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoProvider>
      <SunriseFormProvider>
        <AppRouter />
      </SunriseFormProvider>
    </TodoProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// index css
import "./index.css";

// router
import { router } from "./routers/page-router";
import { RouterProvider } from "react-router-dom";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context store
import ContextProvider from "./context/store";


// main
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClickrtl={true}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        bodyClassName="toastBody"
      />
    </ContextProvider>

  </StrictMode>
);

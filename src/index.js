import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import { ProductsProvider } from "./store/productContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProductsProvider>
        <ProductPage></ProductPage>
      </ProductsProvider>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

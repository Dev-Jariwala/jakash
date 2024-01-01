import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import { ProductsProvider } from "./store/productContext";
import RetailBillPage from "./pages/RetailBillPage";
import WholeSaleBill from "./pages/WholeSaleBill";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/navbar/Navbar";
import "./index.css";
import { StockProvider } from "./store/stockContext";

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <StockProvider>
          <Navbar></Navbar>
          <Routes>
            <Route path="/products" element={<ProductPage />}></Route>
            <Route path="/wholesalebill" element={<WholeSaleBill />}></Route>
            <Route path="/retailbill" element={<RetailBillPage />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </StockProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);

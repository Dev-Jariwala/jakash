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
import "./index.css";
import { StockProvider } from "./store/stockContext";
import SideMenu1 from "./components/sidemenu/SideMenu1";
import StockPage from "./pages/StockPage";
import { ThemeProvider } from "./store/themeContext";
import DashBoard from "./pages/DashBoard";
import BillsPage from "./pages/BillsPage";
import { RetailBillProvider } from "./store/retailBillContext";
import { WholeSaleProvider } from "./store/wholeSaleBillContext";

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
      <ThemeProvider>
        <ProductsProvider>
          <StockProvider>
            <RetailBillProvider>
              <WholeSaleProvider>
                <SideMenu1>
                  <Routes>
                    <Route path="/" element={<DashBoard></DashBoard>}></Route>
                    <Route path="/products" element={<ProductPage />}></Route>
                    <Route path="/stocks" element={<StockPage />}></Route>
                    <Route path="/bills" element={<BillsPage />} />
                    <Route path="*" element={<NotFound />}></Route>
                  </Routes>
                </SideMenu1>
              </WholeSaleProvider>
            </RetailBillProvider>
          </StockProvider>
        </ProductsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import StatisticsIndex from "./statistics/StatisticsIndex";
import ProductIndex from "./products/ProductIndex"

export function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/persons"} className="nav-link">
                Osoby
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/invoices"} className="nav-link">
                Faktury
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Produkty
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/statistics"} className="nav-link">
                Statistiky
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<Navigate to={"/persons"} />} />
          <Route path="/persons">
            <Route index element={<PersonIndex />} />
            <Route path="show/:id" element={<PersonDetail />} />
            <Route path="create" element={<PersonForm />} />
            <Route path="edit/:id" element={<PersonForm />} />
          </Route>

          <Route index element={<Navigate to={"/invoices"} />} />
          <Route path="/invoices">
            <Route index element={<InvoiceIndex />} />
            <Route path="show/:id" element={<InvoiceDetail />} />
            <Route path="create" element={<InvoiceForm />} />
            <Route path="edit/:id" element={<InvoiceForm />} />
          </Route>

          <Route index element={<Navigate to={"/statistics"} />} />
          <Route path="/statistics">
            <Route index element={<StatisticsIndex />} /> 
          </Route>

          <Route index element={<Navigate to={"/products"} />} />
          <Route path="/products">
            <Route index element={<ProductIndex />} />
          </Route>


        </Routes>
      </div>
    </Router>
  );
}

export default App;

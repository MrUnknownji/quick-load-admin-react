import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import "./App.css";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/(dashboard)/dashboard/Dashboard";
import UsersPage from "./components/(dashboard)/users/UsersPage";
import NotificationsPage from "./components/(dashboard)/notifications/Notifications";
import ProductsPage from "./components/(dashboard)/products/ProductsPage";
import ProductOwnersPage from "./components/(dashboard)/product-owners/ProductOwnersPage";
import OrdersPage from "./components/(dashboard)/orders/OrdersPage";
import TransportsPage from "./components/(dashboard)/transports/TransportsPage";
import VehiclesPage from "./components/(dashboard)/vehicles/VehiclesPage";
import PaymentPage from "./components/(dashboard)/payment/PaymentPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product-owners" element={<ProductOwnersPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="transports" element={<TransportsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="payment" element={<PaymentPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

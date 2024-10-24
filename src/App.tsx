import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import ProductInfo from "./components/(dashboard)/products/[productId]/page";
import UserInfo from "./components/(dashboard)/users/[userId]/page";
import ProductOwnerInfo from "./components/(dashboard)/product-owners/[productOwnerId]/page";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import OrderInfo from "./components/(dashboard)/orders/[orderId]/page";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:userId" element={<UserInfo />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:productId" element={<ProductInfo />} />
            <Route path="product-owners" element={<ProductOwnersPage />} />
            <Route
              path="product-owners/:productOwnerId"
              element={<ProductOwnerInfo />}
            />
            <Route path="vehicles" element={<VehiclesPage />} />
            <Route path="transports" element={<TransportsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:orderId" element={<OrderInfo />} />
            <Route path="payment" element={<PaymentPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState, useEffect, useMemo } from "react";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  SortAsc,
  SortDesc,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";
import { Order } from "../../../types/Order";
import LoadingComponent from "../../../components/form-components/LoadingComponent";

interface OrderCardProps {
  title: string;
  count: number;
}

interface OrderTableProps {
  orders: Order[];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const OrdersPage: React.FC = () => {
  const { fetchAllOrders, loading, error, orders } = useOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByStatus, setSortByStatus] = useState<"asc" | "desc">("asc");
  const [selectedTab, setSelectedTab] = useState("All Orders");
  const orderStatuses = ["All Orders", "Pending", "Completed", "Canceled"];

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const filteredOrders = useMemo(() => {
    if (selectedTab !== "All Orders") {
      return orders.filter(
        (order) => order.status?.toLowerCase() === selectedTab.toLowerCase(),
      );
    }
    return orders;
  }, [orders, selectedTab]);

  const paginatedOrders = useMemo(() => {
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (sortByStatus === "asc") {
        return (a.status || "").localeCompare(b.status || "");
      } else {
        return (b.status || "").localeCompare(a.status || "");
      }
    });
    const startIndex = (currentPage - 1) * 10;
    return sortedOrders.slice(startIndex, startIndex + 10);
  }, [filteredOrders, currentPage, sortByStatus]);

  const totalPages = Math.ceil(filteredOrders.length / 10);

  if (loading) return <LoadingComponent />;

  return (
    <div className="p-4 min-h-screen animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <OrderCard title="Total Orders" count={orders.length} />
        <OrderCard
          title="Pending"
          count={orders.filter((order) => order.status === "pending").length}
        />
        <OrderCard
          title="Completed"
          count={orders.filter((order) => order.status === "completed").length}
        />
        <OrderCard
          title="Canceled"
          count={orders.filter((order) => order.status === "canceled").length}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-4 animate-slideUp">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <span>Error: {error}</span>
          </div>
        )}

        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {orderStatuses.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1 rounded-md flex items-center transition-all duration-300 ease-in-out ${
                  selectedTab === tab
                    ? "bg-[var(--color-primary)] text-white scale-105"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
                {selectedTab === tab && tab !== "All Orders" && (
                  <div className="ml-2 bg-white rounded-full p-1">
                    <X
                      size={12}
                      className="text-[var(--color-primary)] cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTab("All Orders");
                      }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setSortByStatus((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="flex items-center px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            {sortByStatus === "asc" ? (
              <SortAsc size={16} />
            ) : (
              <SortDesc size={16} />
            )}
            <span className="ml-1 text-sm">Sort by Status</span>
          </button>
        </div>

        <OrderTable orders={paginatedOrders} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const OrderCard: React.FC<OrderCardProps> = ({ title, count }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center border border-gray-200 transition-all duration-200 ease-in-out transform hover:scale-105">
    <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-1 animate-fadeInUp">
      {count}
    </h2>
    <p className="text-sm text-gray-600">{title}</p>
  </div>
);

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left p-2">Order ID</th>
          <th className="text-left p-2">User</th>
          <th className="text-left p-2">Product</th>
          <th className="text-left p-2">Amount</th>
          <th className="text-left p-2">Status</th>
          <th className="text-left p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            key={order._id}
            className="border-b hover:bg-gray-50 animate-fadeIn"
          >
            <td className="p-2">#{order._id?.slice(-6)}</td>
            <td className="p-2">{order.userId}</td>
            <td className="p-2">{order.productType}</td>
            <td className="p-2">₹{order.totalAmount}</td>
            <td className="p-2">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </td>
            <td className="p-2">
              <Link
                to={`/orders/${order._id}`}
                className="text-gray-600 hover:text-gray-900 transition-transform duration-200 ease-in-out transform hover:scale-110 inline-block mr-2"
              >
                <Eye size={18} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
    <p className="text-sm text-gray-600 mb-2 sm:mb-0">
      Showing data {(currentPage - 1) * 10 + 1} to{" "}
      {Math.min(currentPage * 10, totalPages * 10)} of {totalPages * 10} entries
    </p>
    <div className="flex space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border ${
            currentPage === page
              ? "bg-[var(--color-primary)] text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
);

export default OrdersPage;

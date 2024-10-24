"use client";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Check, Trash } from "lucide-react";
import { useOrder } from "../../../../hooks/useOrder";
import SelectField from "../../../../components/form-components/SelectField";
import LoadingComponent from "../../../../components/form-components/LoadingComponent";
import { Order } from "../../../../types/Order";

const OrderInfo = () => {
  const { orderId } = useParams();
  const { orders, loading, error, updateOrderStatus, fetchAllOrders } =
    useOrder();
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const order = orders.find((o) => o._id === orderId);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status || "pending");
    }
  }, [order]);

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error: {error}</div>;
  if (!order) return <div>No order found</div>;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await updateOrderStatus(orderId!, selectedStatus as Order["status"]);
      setIsEditing(false);
      navigate(-1);
    } catch (err) {
      console.error("Failed to update order status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = () => {
    console.log("Delete functionality not implemented yet");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order Details</h2>
        <div className="flex flex-row gap-5">
          <Trash
            className="h-8 w-8 text-red-500 cursor-pointer"
            aria-label="Delete"
            onClick={handleDelete}
          />
          {isEditing ? (
            <Check
              className={`h-8 w-8 ${
                updating ? "text-gray-400" : "text-blue-500 cursor-pointer"
              }`}
              aria-label="Save"
              onClick={updating ? undefined : handleUpdate}
            />
          ) : (
            <Edit
              className="h-8 w-8 text-blue-500 cursor-pointer"
              aria-label="Edit"
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>

      {updating && <LoadingComponent />}

      <div className={updating ? "opacity-50 pointer-events-none" : ""}>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Order Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-600">
                Order ID: <span className="font-medium">#{order._id}</span>
              </p>
              <p className="text-gray-600">
                User ID: <span className="font-medium">{order.userId}</span>
              </p>
              <p className="text-gray-600">
                Product Owner ID:{" "}
                <span className="font-medium">{order.productOwnerId}</span>
              </p>
              <p className="text-gray-600">
                Product ID:{" "}
                <span className="font-medium">{order.productId}</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                Product Type:{" "}
                <span className="font-medium">{order.productType}</span>
              </p>
              <p className="text-gray-600">
                Size: <span className="font-medium">{order.productSize}</span>
              </p>
              <p className="text-gray-600">
                Quantity:{" "}
                <span className="font-medium">{order.productQuantity}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Price Details</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              Product Price:{" "}
              <span className="font-medium">₹{order.productPrice}</span>
            </p>
            <p className="text-gray-600">
              Loading Charge:{" "}
              <span className="font-medium">₹{order.loadingCharge}</span>
            </p>
            <p className="text-gray-600">
              Broker Charge:{" "}
              <span className="font-medium">₹{order.brokerCharge}</span>
            </p>
            <p className="text-gray-600">
              Platform Charge:{" "}
              <span className="font-medium">₹{order.platformCharge}</span>
            </p>
            <p className="text-gray-600 font-semibold">
              Total Amount:{" "}
              <span className="text-lg">₹{order.totalAmount}</span>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Order Status</h3>
          <div className="max-w-xs">
            <SelectField
              label="Status"
              name="status"
              options={["pending", "completed", "canceled"]}
              value={selectedStatus}
              onChange={handleStatusChange}
              readOnly={!isEditing}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderInfo;

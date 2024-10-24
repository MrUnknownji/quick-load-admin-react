import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import LoadingComponent from "./form-components/LoadingComponent";

const ProtectedRoute = () => {
  const { user, loading } = useUser();
  const accessToken = localStorage.getItem("accessToken");

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  if (!accessToken || !user || user.type !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

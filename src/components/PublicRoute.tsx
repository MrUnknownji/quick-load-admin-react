import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import LoadingComponent from "./form-components/LoadingComponent";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  const accessToken = localStorage.getItem("accessToken");

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  if (accessToken && user?.type === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;

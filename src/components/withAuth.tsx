import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import LoadingComponent from "./form-components/LoadingComponent";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useUser();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("No access token found");
        navigate("/", { replace: true });
        return;
      }

      if (!user) {
        console.log("No user found");
        navigate("/", { replace: true });
      } else {
        console.log("Current user:", user);
        // const isAdmin = user.type === "admin";
        const isAdmin = true;
        setIsAuthorized(isAdmin && !!accessToken);

        if (!isAdmin) {
          console.log("User type:", user.type);
        }
      }
    }
  }, [user, loading, navigate]);

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );

  if (!isAuthorized) {
    console.log("Access denied. User:", user);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md relative">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Access Denied
          </h1>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => navigate("/login")}
          />
          <p className="text-gray-700">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faShop,
  faTruck,
  faShip,
  faClipboardList,
  faCreditCard,
  faSignOutAlt,
  faTimes,
  faBell,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  expanded: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  expanded,
  isMobile,
  toggleSidebar,
  currentPath,
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: faHome, path: "/dashboard" },
    { name: "Users", icon: faUsers, path: "/users" },
    { name: "Notifications", icon: faBell, path: "/notifications" },
    { name: "Products", icon: faBox, path: "/products" },
    { name: "Product Owners", icon: faShop, path: "/product-owners" },
    { name: "Vehicles", icon: faTruck, path: "/vehicles" },
    { name: "Transports", icon: faShip, path: "/transports" },
    { name: "Orders", icon: faClipboardList, path: "/orders" },
    { name: "Payment", icon: faCreditCard, path: "/payment" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside
      className={`bg-[#3c0b0b] text-white ${
        expanded ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out h-screen flex flex-col fixed md:relative z-50 ${
        isMobile && !expanded ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <div className={`${expanded ? "h-24 w-full" : "h-12 w-12"} relative`}>
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        {isMobile && (
          <button onClick={toggleSidebar} className="text-white">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        )}
      </div>

      <nav className="mt-8 flex-grow">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2 px-4">
              <Link to={item.path}>
                <div
                  className={`flex items-center py-2 px-4 rounded-lg transition-all duration-200 ease-in-out
                    ${
                      currentPath === item.path
                        ? "bg-white text-[#3c0b0b] shadow-md"
                        : "hover:bg-[#4c1b1b]"
                    }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`${expanded ? "mr-4" : "mx-auto"}`}
                  />
                  {expanded && <span>{item.name}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full py-2 px-4 hover:bg-[#4c1b1b] rounded-lg transition-all duration-200 ease-in-out"
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className={`${expanded ? "mr-4" : "mx-auto"}`}
          />
          {expanded && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

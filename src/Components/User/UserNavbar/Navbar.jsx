import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../Firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { Button, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import ProfileBtn from "./profilebtn";
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await deleteDoc(doc(db, "activeUsers", user.uid)); // Remove from active users
        await signOut(auth);
        navigate("/login");
      }
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/logo2.png"
          alt="logo2"
          className="logo"
        />
        <span className="brand-name">PaperTrading</span>
      </div>
      <div>  
        <div className="nav-links">
          {[
            { label: "Dashboard", path: "/user-dashboard", icon: "fas fa-home", active: true },
            { label: "Holdings", path: "/user-dashboard/holdings", icon: "fas fa-chart-line" },
            { label: "Order", path: "/user-dashboard/order", icon: "fas fa-shopping-cart" },
            { label: "Watchlist", path: "/user-dashboard/watchlist", icon: "fas fa-list" },
          ].map(({ label, path, icon, active }) => (
            <Link key={label} to={path} className={`nav-item ${active ? "active" : ""}`}>
              <i className={icon}></i>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Button with onClick */}
      {/* <space className="right">       */}
      <Space>
        <div className="profile-container">
              <ProfileBtn />  
          </div>
            <div className="logout">
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                className="logoutbtn"
                onClick={handleLogout} // Fix: Added onClick
              >
            Log Out
          </Button>
        </div>
      </Space>
        
      {/* </space>   */}
    </nav>
  );
};

export default Navbar;

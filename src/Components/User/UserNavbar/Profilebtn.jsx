import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
import { Button } from "antd";
import "./Profilebtn.css";

const ProfileBtn = () => {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    }
  }, [user]);

  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  return (
    <div className="navbar-right">
      <Button onClick={() => setOpen(!open)} className="profile-button">
        Profile
      </Button>
      {open && userData && (
        <div className="profile-dropdown">
          <p className="font-bold">Name: {userData.name}</p>
          <p className="text-gray-500">Email:{userData.email}</p>
          <p>Total Balance: ₹{userData.totalBalance}</p>
          <p>Available Balance: ₹{userData.availableBalance}</p>
          <p>Profit/Loss: ₹{userData.profitLoss}</p>
          <Button onClick={() => setOpen(false)} className="close-profile">
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;

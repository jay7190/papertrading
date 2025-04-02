import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import SearchStock from "../searchstock/StockSearch";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const auth = getAuth();
const db = getFirestore();

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("No user data found");
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userData ? (
    <div>
      <h1>Welcome, {userData.name}</h1>
      <p>Email: {userData.email}</p>
      <p>Balance: {userData.balance}</p>
      <SearchStock />
    </div>
  ) : (
    <p>Loading user data...</p>
  );
};

export default UserDashboard;

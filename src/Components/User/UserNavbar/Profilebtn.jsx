import { useState } from "react";
import { Button } from "antd";
import { useGlobalUser } from "../../../hooks/useGlobalState";
import "./Profilebtn.css";

const ProfileBtn = () => {
  const [open, setOpen] = useState(false);
  const [globalUser] = useGlobalUser();

  // Fallback: use displayName or 'User' if name is not set
  const userName = globalUser.user?.name || globalUser.user?.displayName || "User";

  return (
    <div className="navbar-right">
      <Button onClick={() => setOpen(!open)} className="profile-button">
        Profile
      </Button>
      {open && globalUser.user && (
        <div className="profile-dropdown">
          <p className="text-gray-500">Email: {globalUser.user.email}</p>
          <p>Total Funds: ₹{globalUser.funds.toFixed(2)}</p>
          <p>Total Holdings: {Object.keys(globalUser.holdings || {}).length}</p>
          <p>
            Available Balance: ₹
            {(
              globalUser.funds -  Object.values(globalUser.holdings || {}).reduce(
                (total, holding) => total + holding.quantity * holding.avgPrice,
                0
              )
            ).toFixed(2)}
          </p>
          <Button onClick={() => setOpen(false)} className="close-profile">
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;

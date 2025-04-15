import { Menu, Button } from "antd";
import {
    AppstoreOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");  
        navigate("/login");
    };

    return (
        <div className="SideBar">
            <Menu
                className="SideMenuVertical"
                mode="vertical"
                onClick={(item) => {
                    navigate(`/admin-dashboard${item.key}`);
                }}
                items={[
                    { label: "Dashboard", icon: <AppstoreOutlined />, key: "" },
                    { label: "Customers", icon: <UserOutlined />, key: "/customers" },
                    { label: "Orders", icon: <ShoppingCartOutlined />, key: "/orders" },
                ]}
            />

            <div className="logout-container">
                <Button
                    type="primary"
                    danger
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Log Out
                </Button>
            </div>
        </div>
    );
}

export default SideBar;

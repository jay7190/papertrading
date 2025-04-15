import { useEffect, useState } from "react";
import { Typography, Card, Statistic } from "antd";
import {Space} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../Firebase";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const activeUsersCollection = collection(db, "activeUsers");

    // Real-time listener for total users
    const unsubscribeTotalUsers = onSnapshot(usersCollection, (snapshot) => {
      setTotalUsers(snapshot.size); // Count total users
    });

    // Real-time listener for active users
    const unsubscribeActiveUsers = onSnapshot(activeUsersCollection, (snapshot) => {
      setActiveUsers(snapshot.size); // Count active users
    });

    return () => {
      unsubscribeTotalUsers();
      unsubscribeActiveUsers();
    };
  }, []);

  return (
    <div>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <TeamOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(48, 148, 178, 0.25)",
                borderRadius: 16,
                fontSize: 24,
                padding: 20,
              }}
            />
          }
          title={"Total Users"}
          value={totalUsers}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(63, 178, 107, 0.25)",
                borderRadius: 16,
                fontSize: 24,
                padding: 20,
              }}
            />
          }
          title={"Active Users"}
          value={activeUsers}
        />
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 16,
                fontSize: 24,
                padding: 20,
              }}
            />
          }
          title={"Orders"}
          value={"-"} // Placeholder value (modify as needed)
        />
        <DashboardCard
          icon={
            <StopOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(176, 28, 28, 0.25)",
                borderRadius: 16,
                fontSize: 24,
                padding: 20,
              }}
            />
          }
          title={"Suspended Users"}
          value={"-"} // Placeholder value (modify as needed)
        />
      </Space>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ textAlign: "center" }}>
      <Space direction="vertical" align="center">
        <div style={{ display: "flex", justifyContent: "center" }}>{icon}</div>
        <Statistic title={title} value={value ?? "..."} />
      </Space>
    </Card>
  );
}

export default Dashboard;

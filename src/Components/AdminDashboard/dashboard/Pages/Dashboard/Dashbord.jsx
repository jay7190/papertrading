import { useEffect, useState } from "react";
import { Typography, Card, Statistic, Space } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../../../../Firebase";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const activeUsersCollection = collection(db, "activeUsers");

    const unsubscribeTotalUsers = onSnapshot(usersCollection, (snapshot) => {
      setTotalUsers(snapshot.size);
      fetchAllTransactions(snapshot.docs); // Fetch total orders when user data updates
    });

    const unsubscribeActiveUsers = onSnapshot(activeUsersCollection, (snapshot) => {
      setActiveUsers(snapshot.size);
    });

    return () => {
      unsubscribeTotalUsers();
      unsubscribeActiveUsers();
    };
  }, []);

  const fetchAllTransactions = async (userDocs) => {
    try {
      let orderCount = 0;
      for (const userDoc of userDocs) {
        const transactionsRef = collection(db, "users", userDoc.id, "transactions");
        const transactionsSnapshot = await getDocs(transactionsRef);
        orderCount += transactionsSnapshot.size;
      }
      setTotalOrders(orderCount);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal" wrap>
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
          value={totalOrders}
        />
      </Space>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ textAlign: "center", width: 240 }}>
      <Space direction="vertical" align="center">
        <div>{icon}</div>
        <Statistic title={title} value={value ?? "..."} />
      </Space>
    </Card>
  );
}

export default Dashboard;

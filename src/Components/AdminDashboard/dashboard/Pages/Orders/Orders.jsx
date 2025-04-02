import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const sampleData = [
        { id: "SH001", userName: "John Doe", shareName: "Apple Inc.", currentPrice: 155, orderPrice: 152, orderType: "Buy", status: "Completed", date: "2025-03-27" },
        { id: "SH002", userName: "Alice Smith", shareName: "Tesla", currentPrice: 720, orderPrice: 710, orderType: "Sell", status: "Pending", date: "2025-03-27" },
        { id: "SH003", userName: "Robert Brown", shareName: "Amazon", currentPrice: 3100, orderPrice: 3150, orderType: "Buy", status: "Canceled", date: "2025-03-28" },
        { id: "SH004", userName: "Emily Johnson", shareName: "Microsoft", currentPrice: 305, orderPrice: 300, orderType: "Sell", status: "Completed", date: "2025-03-29" },
      ];
      setOrders(sampleData);
    };

    fetchOrders();
  }, []);

  const filterOrders = () => {
    return orders.filter((order) => {
      const matchesName = !searchName || order.userName.toLowerCase().includes(searchName.toLowerCase());
      const matchesDate =
        (!startDate || order.date >= startDate) &&
        (!endDate || order.date <= endDate);
      return matchesName && matchesDate;
    });
  };

  const generatePDF = () => {
    const filteredOrders = filterOrders();

    if (filteredOrders.length === 0) {
      alert("No orders found for the selected filters.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Order Report", 14, 15);

    const tableColumn = ["Share ID", "User Name", "Share Name", "Current Price", "Order Price", "Order Type", "Order Status", "Date"];
    const tableRows = [];

    filteredOrders.forEach((order) => {
      tableRows.push([
        order.id,
        order.userName,
        order.shareName,
        `$${order.currentPrice.toFixed(2)}`,
        `$${order.orderPrice.toFixed(2)}`,
        order.orderType,
        order.status,
        order.date,
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save("filtered_orders_report.pdf");
  };

  return (
    <div className="orders-container">
      <h2>Order List</h2>
      <div className="filters">
        <label>
          Search by User Name: 
          <input type="text" value={searchName} placeholder="Enter name..." onChange={(e) => setSearchName(e.target.value)} />
        </label>
        <label>
          Start Date: 
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date: 
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={generatePDF} className="download-btn">Download Pdf</button>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Share ID</th>
            <th>User Name</th>
            <th>Share Name</th>
            <th>Current Price</th>
            <th>Order Price</th>
            <th>Order Type</th>
            <th>Order Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filterOrders().map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userName}</td>
              <td>{order.shareName}</td>
              <td>${order.currentPrice.toFixed(2)}</td>
              <td>${order.orderPrice.toFixed(2)}</td>
              <td className={order.orderType.toLowerCase()}>{order.orderType}</td>
              <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;

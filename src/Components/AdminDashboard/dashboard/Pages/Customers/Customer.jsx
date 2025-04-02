import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../Firebase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./customer.css";

function Customers() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => {
          const userData = doc.data();
          return {
            id: doc.id,
            ...userData,
            createdAt: userData.createdAt
              ? new Date(userData.createdAt.seconds * 1000).toISOString().split("T")[0] // YYYY-MM-DD format
              : "N/A",
          };
        });
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filterUsers = () => {
    return users.filter(user => {
      const matchesName = !searchName || user.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesDate = (!startDate || !endDate) || (user.createdAt >= startDate && user.createdAt <= endDate);
      return matchesName && matchesDate;
    });
  };

  const generatePDF = () => {
    const filteredUsers = filterUsers();

    if (filteredUsers.length === 0) {
      alert("No users found for the selected filters.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Users Report", 14, 15);

    const tableColumn = ["ID", "Name", "Email", "Registered Date"];
    const tableRows = [];

    filteredUsers.forEach((user) => {
      tableRows.push([user.id, user.name, user.email, user.createdAt]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save("users_report.pdf");
  };

  return (
    <div className="customers-container">
      <h2>Users List</h2>
      <div className="filters">
        <label>Search Name: <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} /></label>
        <label>Start Date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></label>
        <label>End Date: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></label>
        <button onClick={generatePDF} className="download-btn">Download PDF</button>
      </div>
      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registered Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers().map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
  
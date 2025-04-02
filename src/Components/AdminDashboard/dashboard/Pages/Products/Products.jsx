import { useState, useEffect } from "react";
import "./Products.css"; 

function Products() {
  const [shares, setShares] = useState([]);

  useEffect(() => {
    const fetchShares = async () => {
      const sampleData = [
        { id: "SH001", name: "Apple Inc.", openPrice: 150, currentPrice: 155 },
        { id: "SH002", name: "Tesla", openPrice: 700, currentPrice: 720 },
        { id: "SH003", name: "Amazon", openPrice: 3200, currentPrice: 3100 },
        { id: "SH004", name: "Microsoft", openPrice: 299, currentPrice: 305 },
      ];
      setShares(sampleData);
    };

    fetchShares();
  }, []);

  return (
    <div className="products-container">
      <h2>Stock Market Shares</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Share ID</th>
            <th>Share Name</th>
            <th>Open Price</th>
            <th>Current Price</th>
          </tr>
        </thead>
        <tbody>
          {shares.map((share) => (
            <tr key={share.id}>
              <td>{share.id}</td>
              <td>{share.name}</td>
              <td>${share.openPrice.toFixed(2)}</td>
              <td className={share.currentPrice >= share.openPrice ? "up" : "down"}>
                ${share.currentPrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;

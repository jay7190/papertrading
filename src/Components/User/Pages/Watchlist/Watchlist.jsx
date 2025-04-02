import "./Watchlist.css"
import { useState } from "react";

const sampleData = [
    { name: "Indian Railway Finance Corp", price: 119.3, change: -0.38 },
    { name: "Central Bank of India", price: 42.16, change: -1.61 },
    { name: "Bank of Baroda", price: 202.56, change: -0.72 },
    { name: "Adani Ports & Special Economic Zone", price: 1135.0, change: -0.69 },
    { name: "Steel Authority of India", price: 108.13, change: 0.80 },
    { name: "Tata Steel", price: 150.75, change: -0.20 },
    { name: "Punjab National Bank", price: 88.17, change: -0.49 },
    { name: "Zomato", price: 208.07, change: -1.52 },
];

function Watchlist() {
    const [search, setSearch] = useState("");

    const filteredData = sampleData.filter((stock) =>
        stock.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search & add"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
            <table className="watchlist-table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Market Price</th>
                        <th>Day Change (%)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((stock, index) => (
                        <tr key={index}>
                            <td>{stock.name}</td>
                            <td>₹{stock.price.toFixed(2)}</td>
                            <td className={stock.change >= 0 ? "positive" : "negative"}>
                                {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}%
                            </td>
                            <td>
                                <button className="buy-btn">Buy</button>
                                <button className="sell-btn">Sell</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Watchlist;

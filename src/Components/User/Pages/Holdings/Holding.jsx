import "./Holding.css";
import { useState } from "react";

const holdings = [
    { company: "GAIL (India)", shares: 2, avgPrice: 124.35, marketPrice: 156.78, returns: 64.86, invested: 248.7, change: 1.64, changePercent: 1.06 },
    { company: "Central Bank of India", shares: 5, avgPrice: 54.27, marketPrice: 42.16, returns: -60.55, invested: 271.35, change: -0.69, changePercent: -1.61 },
    { company: "Tata Steel", shares: 2, avgPrice: 134.75, marketPrice: 150.75, returns: 32, invested: 269.5, change: -0.30, changePercent: -0.20 },
    { company: "Bajaj Housing Finance", shares: 6, avgPrice: 157.38, marketPrice: 113.51, returns: -263.22, invested: 944.28, change: -1.82, changePercent: -1.58 },
    { company: "BHEL", shares: 4, avgPrice: 194.12, marketPrice: 194.12, returns: -81.32, invested: 776.48, change: 2.14, changePercent: 1.12 }
];

const Holding = () => {
    const [showModal, setShowModal] = useState(null);

    const handleModal = (type) => {
        setShowModal(type);
    };

    return (
        <div className="holdings-container">
            <h1>Holdings (5)</h1>
            <div className="holdings-summary">
                <p>₹2,283 <span>Current Value</span></p>
                <p>₹2,592 <span>Invested Value</span></p>
                <p>-₹308 (11.89%) <span>Total Returns</span></p>
                <p>-₹4 (0.16%) <span>1D Returns</span></p>
            </div>
            <table className="holdings-table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Market Price (1D%)</th>
                        <th>Returns (%)</th>
                        <th>Current (Invested)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {holdings.map((stock, index) => (
                        <tr key={index}>
                            <td>{stock.company}<br /><small>{stock.shares} shares • Avg. ₹{stock.avgPrice.toFixed(2)}</small></td>
                            <td>
                                ₹{stock.marketPrice.toFixed(2)}<br />
                                <span className={stock.change > 0 ? "positive" : "negative"}>
                                    {stock.change} ({stock.changePercent}%)
                                </span>
                            </td>
                            <td className={stock.returns >= 0 ? "positive" : "negative"}>
                                {stock.returns >= 0 ? `+₹${stock.returns.toFixed(2)}` : `-₹${Math.abs(stock.returns).toFixed(2)}`}<br />
                                {stock.returns >= 0 ? `${((stock.returns / stock.invested) * 100).toFixed(2)}%` : `-${((Math.abs(stock.returns) / stock.invested) * 100).toFixed(2)}%`}
                            </td>
                            <td>₹{(stock.invested + stock.returns).toFixed(2)}<br />₹{stock.invested.toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleModal('buy')} className="buy-btn" >Buy</button>
                                <button onClick={() => handleModal('sell')} className="sell-btn" >Sell</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{showModal === 'buy' ? 'Buy Stocks' : 'Sell Stocks'}</h2>
                        <p>Enter details for the transaction.</p>
                        <button onClick={() => setShowModal(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Holding;

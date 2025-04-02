import React, { useState } from "react";
import axios from "axios";
import { db } from "../../../../Firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const StockSearch = ({ userId }) => {
  const [query, setQuery] = useState("");
  const [candlestickData, setCandlestickData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const ACCESS_TOKEN = "YOUR_UPSTOX_ACCESS_TOKEN"; // Replace with valid Upstox token
  const INTERVAL = "5minute"; // Options: "1minute", "5minute", "15minute", "30minute", "60minute", "day"

  const fetchIntradayData = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setCandlestickData([]);

    try {
      // Convert input to Upstox format (e.g., "TCS.NS" → "NSE_EQ|TCS")
      const stockSymbol = query.toUpperCase().replace(".NS", "").replace(".BS", "");
      const instrumentKey = query.includes(".NS") ? `NSE_EQ|${stockSymbol}` : `BSE_EQ|${stockSymbol}`;

      // Fetch historical intraday candlestick data
      const response = await axios.get(
        `https://api.upstox.com/v2/historical-candle/intraday/${instrumentKey}/${INTERVAL}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      const data = response.data.data.candles;
      if (data && data.length > 0) {
        setCandlestickData(data);
      } else {
        setError("No intraday data found.");
      }
    } catch (err) {
      setError("Error fetching intraday data. Check API token and symbol.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter stock symbol (e.g., TCS.NS)"
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button onClick={fetchIntradayData} style={{ padding: "10px" ,color:"white", backgroundColor:"blue",}}>
        search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {candlestickData.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Intraday Candlestick Data</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Time</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {candlestickData.map((candle, index) => (
                <tr key={index}>
                  <td>{new Date(candle[0]).toLocaleTimeString()}</td>
                  <td>{candle[1]}</td>
                  <td>{candle[2]}</td>
                  <td>{candle[3]}</td>
                  <td>{candle[4]}</td>
                  <td>{candle[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockSearch;

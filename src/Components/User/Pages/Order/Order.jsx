import "./Order.css";

const orders = [
    { date: '04 December, 2024', time: '10:19 AM', company: 'Indian Railway Finance Corp', type: 'SELL', quantity: 5, avgPrice: 152.00 },
    { date: '17 October, 2024', time: '10:03 AM', company: 'Indian Railway Finance Corp', type: 'BUY', quantity: 5, avgPrice: 151.85 },
    { date: '30 September, 2024', time: '12:07 PM', company: 'Bank of Baroda', type: 'SELL', quantity: 1, avgPrice: 250.20 },
    { date: '24 September, 2024', time: '12:01 PM', company: 'Bank of Baroda', type: 'SELL', quantity: 1, avgPrice: 247.00 },
    { date: '16 September, 2024', time: '10:35 AM', company: 'Bajaj Housing Finance', type: 'BUY', quantity: 6, avgPrice: 157.38 },
    { date: '02 April, 2024', time: '12:02 PM', company: 'Suzlon Energy', type: 'SELL', quantity: 5, avgPrice: 41.05 },
    { date: '29 March, 2024', time: '11:30 AM', company: 'Suzlon Energy', type: 'SELL', quantity: 5, avgPrice: 42.49 },
    { date: '20 March, 2024', time: '10:26 AM', company: 'Central Bank of India', type: 'BUY', quantity: 2, avgPrice: 56.15 }
];

const Order = () => {
    return (
        <div className="all-orders-container">
            <h1>All Orders</h1>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Company</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Avg Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.date}</td>
                            <td>{order.time}</td>
                            <td>{order.company}</td>
                            <td className={order.type.toLowerCase()}>{order.type}</td>
                            <td>{order.quantity}</td>
                            <td>₹{order.avgPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Order;

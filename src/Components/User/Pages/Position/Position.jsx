
import "./Position.css";
import { FaRegCircle } from "react-icons/fa"; // For small floating dots

const NoPositions = () => {
    return (
        <div className="no-positions-container">
            <div className="icon-container">
                <div className="jar">
                    <div className="coin"></div>
                </div>
                <FaRegCircle className="dot dot1" />
                <FaRegCircle className="dot dot2" />
            </div>
            <h1>You have no positions</h1>
            <p>Intraday & F&O trades will appear here</p>
        </div>
    );
};

export default NoPositions;

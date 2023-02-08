import React from "react";
import './main.css';

function Main({ data }) {
    return (
        <div className="mainwrapper"> {[...data].map(({ slot_id, vehicle_category, price, status }) => (
            <div className="bebra" key={slot_id}>{slot_id} {vehicle_category} {price} {status}</div>
        ))}
        </div>
    )
};

export default Main;
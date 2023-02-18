import React from "react";
import "./main.css";

type DataRow = {
  slot_id: string;
  vehicle_category: string;
  price: number;
  status: string;
};

type MainProps = {
  data: {
    rows: DataRow[];
  } | null;
};

function Main({ data }: MainProps) {
  return (
    <div className="mainWrapper">
      {data ? (
        [...data.rows].map(({ slot_id, vehicle_category, price, status }) => (
          <div className="slots" key={slot_id}>
            {vehicle_category} {price} {status}
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Main;

import React from "react";
import "./main.css";

function Main({ data }) {
  return (
    <div className="mainWrapper">
      {data ? (
        [...data.rows].map(
          ({ user_id, username, password, full_name, phone_number }) => (
            <div className="slots" key={user_id}>
              {username} {password} {full_name} {phone_number}
            </div>
          )
        )
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Main;

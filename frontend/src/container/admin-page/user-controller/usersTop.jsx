import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ITEMS_PER_PAGE = 5;

const UsersTop = () => {
  const axiosPrivate = useAxiosPrivate();
  const users = useAppSelector((state) => state.user.users);

  const [top, setTop] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const topUsers = [];
        for (const user of users) {
          const response = await axiosPrivate.get(
            `/booking/totalbookings/username/${encodeURIComponent(
              user.username
            )}`
          );
          topUsers.push({
            total: response.data.rows[0].total_bookings,
            username: user.username,
          });
        }
        topUsers.sort((a, b) => b.total - a.total);
        setTop(topUsers);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchTopUsers();
  }, [users]);

  const totalPages = Math.ceil(top.length / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = top.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Top</th>
            <th>Total Bookings</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.total}</td>
              <td>{item.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="booking-btns">
        <button
          className="booking-btns-btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-current">{currentPage}</span>
        <button
          className="booking-btns-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersTop;

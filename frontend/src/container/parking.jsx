import React, { useEffect, useState } from "react";
import "./parking.css";
import Header from "./header/header";
import Main from "./main/main";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const Parking = () => {
  const [data, setData] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/parking/parkingslots", {});
        isMounted && setData(response.data);
      } catch (err) {
        console.error(err);
        navigate("/sign_in", { replace: true });
      }
    };
    getUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="parkingWrapper">
      <Header />
      <Main data={data} />
    </div>
  );
};

export default Parking;

import React, { useEffect, useState } from "react";
import "./parking.css";
import Header from "./header/header";
import Main from "./main/main";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

const Parking = () => {
  const [data, setData] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    // const getUsers = async () => {
    //   try {
    //     const response = await axiosPrivate.get("/user/users", {});
    //     isMounted && setData(response.data);
    //   } catch (err) {
    //     console.error(err);
    //     // navigate("/sign_in", { state: { from: location }, replace: true });
    //   }
    // };
    // getUsers();
    try {
      axios.get("http://localhost:3001/user/users").then((res) => {
        isMounted && setData(res.data);
      });
    } catch (err) {
      console.error(err);
      navigate("/sign_in", { replace: true });
    }
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
